const topo = require('./bulgaria.topo.json');
const objects = topo.objects.Bulgaria.geometries

objects.forEach(obj => {
  const id = obj.properties.Constituency
  obj.id = id
})

console.log(JSON.stringify(topo))

