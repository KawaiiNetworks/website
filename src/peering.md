---
outline: deep
---

# 和 Kawaii Networks 建立对等连接

## Peering Policy

我们愿意与任何满足以下条件的网络建立对等连接：

1. 网络信息完整。在 [PeeringDB](https://www.peeringdb.com/) 上列出了 IRR as-set，IPv4 Prefixes，IPv6 Prefixes。
2. 与我们直接连接。例如处在同一个 IX，或者通过物理链路连接。有时我们也接受通过隧道连接。
3. 遵守基本规则。不向我们公布 RPKI Invalid 或没有 IRR record 的路由。仅向我们发送和我们公布的路由对应的流量。
4. 在所有可用地点建立对等连接。
5. 不在我们的黑名单。我们不与拥有不良前科的网络建立对等连接。

如果您的网络符合以上条件，欢迎通过任何方式联系我们。
