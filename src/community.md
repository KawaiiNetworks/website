# BGP Communities

## Real-time data

Please visit [https://bgp.tools/communities/27523](https://bgp.tools/communities/27523).

## Community list

### Information Communities

|    Community    |     Description     |
| :-------------: | :-----------------: |
|   27523:0:100   |    from upstream    |
|   27523:0:200   |    from upstream    |
|   27523:0:300   |  from routeserver   |
|   27523:0:400   |      from peer      |
|   27523:0:500   |   from downstream   |
| 27523:10000:nnn |      from AS$0      |
| 27523:10001:nnn | from neighbor id $0 |

[What is neighbor id?](https://net.projectk.org/router)

### Control Communities

|   Community    |            Description            |
| :------------: | :-------------------------------: |
|  27523:1000:0  |     do not announce to ANY AS     |
| 27523:1000:nnn |      do not announce to AS$0      |
|  27523:1001:0  |  do not announce to ANY neighbor  |
| 27523:1001:nnn | do not announce to neighbor id $0 |
| 27523:1011:nnn |   prepend 1x to AS$0 (pending)    |
| 27523:1012:nnn |   prepend 2x to AS$0 (pending)    |
| 27523:1013:nnn |   prepend 3x to AS$0 (pending)    |
| 27523:1020:nnn |  set local-pref to $0 (pending)   |
| 27523:1030:nnn |    set metric to $0 (pending)     |
| 27523:1031:nnn |    set metric += $0 (pending)     |
| 27523:1032:nnn |    set metric -= $0 (pending)     |