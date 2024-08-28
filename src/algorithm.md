---
outline: deep
---

# Kawaii Networks 的路由过滤算法

我们使用 bgpq4 生成 as-set 以及 prefix list。采用的数据库包括：

`RPKI,AFRINIC,ARIN,APNIC,LACNIC,RIPE,RADB,ALTDB`

名词含义：

-   接受：接受路由，此后不再参与过滤。
-   拒绝：拒绝路由，此后不再参与过滤。
-   匹配：匹配路由，此后继续参与过滤。

对于每个 BGP 会话，我们都会生成一个对应的接收过滤器以及发送过滤器。路由器配置文件每日 10 点，22 点由 Github Actions 生成，12 点，0 点应用。具体算法如下：

## 接收路由

### IBGP

1. 接受所有额外允许的 prefix。
2. 接受所有属于自己 AS 的前缀，最长可接受 32（IPv4）和 128（IPv6）。
3. 拒绝所有前缀长度在 0-7 ，25-32 的路由（IPv4），所有前缀长度在 0-15，49-128 的路由（IPv6）。拒绝所有 as-path 包含 Bogon ASN 的路由。拒绝所有 Bogon IPv4 以及 Bogon IPv6 前缀。
4. 拒绝所有 RPKI Invalid 的路由。

路由属性：

-   设置所有接受的路由的 local-preference 为 90。

::: tip
关于 IBGP 的 local-preference，目前未有定论。应与发送模式有关。
:::

### EBGP

#### Upstream

1. 拒绝所有前缀长度在 0-7 ，25-32 的路由（IPv4），所有前缀长度在 0-15，49-128 的路由（IPv6）。拒绝所有 as-path 包含 Bogon ASN 的路由。拒绝所有 Bogon IPv4 以及 Bogon IPv6 前缀。
2. 拒绝所有 RPKI Invalid 的路由。

路由属性：

-   设置所有接受的路由的 local-preference 为 100。

#### IX Route Server

如果该 IX 在 [PeeringDB](https://www.peeringdb.com/) 上未设置 IRR as-set，则如同 Upstream 处理。
如果该 IX 在 [PeeringDB](https://www.peeringdb.com/) 上设置了 IRR as-set，则如同 Peer 处理。

路由属性：

-   设置所有接受的路由的 local-preference 为 130。

::: tip
目前将所有的 IX Route Server 视为 Upstream 处理。
:::

#### Peer

1. 对于一个与我们建立连接的网络，首先在 [PeeringDB](https://www.peeringdb.com/) 上使用 ASN 查找该网络的 IRR as-set，IPv4 Prefixes，IPv6 Prefixes。如果 IRR as-set 为空，则使用其 ASN 作为 AS-SET （如 AS23333）。如果 IPv4 Prefixes 或 IPv6 Prefixes 为空，则视为不设上限。
2. 拒绝所有前缀长度在 0-7 ，25-32 的路由（IPv4），所有前缀长度在 0-15，49-128 的路由（IPv6）。拒绝所有 as-path 包含 Bogon ASN 的路由。拒绝所有 Bogon IPv4 以及 Bogon IPv6 前缀。
3. 拒绝所有 RPKI Invalid 的路由。
4. 拒绝所有 as-path 不符合该网络的 AS-SET 的路由。as-path 应当如同金字塔一般，从左至右相邻的 AS 均为直接的 Upstream - Downstream 关系。
5. 拒绝所有不在 prefix list 中的路由。

路由属性：

-   设置所有接受的路由的 local-preference 为 160。

::: tip
目前并未实现前缀数量限制。

目前只拒绝 as-path 不符合最左侧是 Peer AS，最右侧是其 Cone AS 的路由。

目前如果 AS Cone 太大，导致 AS-SET 及 prefix list 过大，则只拒绝 as-path 不符合最左侧是 Peer AS 的路由，不对 prefix list 进行限制。
:::

#### Downstream

如同 Peer 处理。

路由属性：

-   设置所有接受的路由的 local-preference 为 200。

## 发送路由

### IBGP

::: tip
关于 IBGP 如何发送路由，目前未有定论
:::

#### 模式 1

1. 接受所有额外允许的 prefix。
2. 接受所有属于自己 AS 的前缀，最长可接受 32（IPv4）和 128（IPv6）。

#### 模式 2

1. 匹配所有类型为 static 和 connected 的路由。
2. 匹配其他所有路由。
3. 接受所有额外允许的 prefix。
4. 接受所有属于自己 AS 的前缀，最长可接受 32（IPv4）和 128（IPv6）。
5. 拒绝所有前缀长度在 0-7 ，25-32 的路由（IPv4），所有前缀长度在 0-15，49-128 的路由（IPv6）。拒绝所有 as-path 包含 Bogon ASN 的路由。拒绝所有 Bogon IPv4 以及 Bogon IPv6 前缀。
6. 拒绝所有 RPKI Invalid 的路由。

### EBGP

#### Upstream

1. 匹配所有类型为 static 和 connected 的路由。接受所有属于自己 AS 的前缀，最长可接受 24（IPv4）和 48（IPv6）。
2. 拒绝从 IBGP 接收的路由。
3. 接受所有源自 Downstream 的路由。（因此仅有当地 Downstream 被发给上游）

#### IX Route Server

如同 Upstream 处理。

#### Peer

1. 匹配所有类型为 static 和 connected 的路由。
2. 匹配所有源自自身 AS 的路由。（例如从 IBGP 获得的）
3. 接受所有属于自己 AS 的前缀，最长可接受 24（IPv4）和 48（IPv6）。
4. 匹配并接受所有源自 Downstream 的路由。

#### Downstream

1. 匹配所有类型为 static 和 connected 的路由。
2. 匹配所有源自自身 AS 的路由。（例如从 IBGP 获得的）
3. 接受所有属于自己 AS 的前缀，最长可接受 24（IPv4）和 48（IPv6）。
4. 匹配并接受所有源自 Downstream 的路由。
5. 匹配并接受所有源自 Peer 的路由。
6. 匹配并接受所有源自 IX Route Server 的路由。
7. 匹配并接受所有源自 Upstream 的路由。
8. 匹配并接受所有源自 IBGP 的路由。
