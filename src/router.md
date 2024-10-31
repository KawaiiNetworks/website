<script setup>
import { ref, onMounted } from 'vue';
import { load } from 'js-yaml';
import CryptoJS from 'crypto-js';

const vyosConfig = ref(null);

function getNeighborId(neighbor) {
  let neighborStr = neighbor?.asn || "";
  neighborStr += Array.isArray(neighbor['neighbor-address']) ? neighbor['neighbor-address'].sort().join('') : neighbor['neighbor-address'];
  console.log(neighborStr);
  let hash = CryptoJS.SHA256(neighborStr).toString(CryptoJS.enc.Hex);
  console.log(hash.slice(-4));
  let res = 1 + parseInt(hash.slice(-4), 16); // 1-65536
  return res;
}

onMounted(async () => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/KawaiiNetworks/AS27523/refs/heads/main/network/vyos/vyos.yaml"); // 替换为你的YAML文件URL
    const yamlText = await response.text();
    vyosConfig.value = load(yamlText);
    vyosConfig.value.router.protocols.bgp.upstream.sort((a, b) => a.asn - b.asn)
    vyosConfig.value.router.protocols.bgp.routeserver.sort((a, b) => a.asn - b.asn)
    vyosConfig.value.router.protocols.bgp.peer.sort((a, b) => a.asn - b.asn)
    vyosConfig.value.router.protocols.bgp.downstream.sort((a, b) => a.asn - b.asn)
  } catch (error) {
    console.error('Error loading YAML:', error);
  }
});
</script>

<div>
  <h1>路由器信息</h1>
  <template v-for="router in vyosConfig?.router">
    <h2>{{ router.name }}</h2>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>ASN</th>
          <th>Neighbor ID</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in router.protocols.bgp.ibgp">
          <td>I</td><td>{{ vyosConfig["local-asn"] }}</td><td>{{ getNeighborId(n) }}</td><td>{{ Array.isArray(n['neighbor-address']) ? n['neighbor-address'].join(', ') : n['neighbor-address'] }}</td>
        </tr>
        <tr v-for="n in router.protocols.bgp.upstream">
          <td>U</td><td>{{ n.asn }}</td><td>{{ getNeighborId(n) }}</td><td>{{ Array.isArray(n['neighbor-address']) ? n['neighbor-address'].join(', ') : n['neighbor-address'] }}</td>
        </tr>
        <tr v-for="n in router.protocols.bgp.routeserver">
          <td>R</td><td>{{ n.asn }}</td><td>{{ getNeighborId(n) }}</td><td>{{ Array.isArray(n['neighbor-address']) ? n['neighbor-address'].join(', ') : n['neighbor-address'] }}</td>
        </tr>
        <tr v-for="n in router.protocols.bgp.peer">
          <td>P</td><td>{{ n.asn }}</td><td>{{ getNeighborId(n) }}</td><td>{{ Array.isArray(n['neighbor-address']) ? n['neighbor-address'].join(', ') : n['neighbor-address'] }}</td>
        </tr>
        <tr v-for="n in router.protocols.bgp.downstream">
          <td>D</td><td>{{ n.asn }}</td><td>{{ getNeighborId(n) }}</td><td>{{ Array.isArray(n['neighbor-address']) ? n['neighbor-address'].join(', ') : n['neighbor-address'] }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</div>
