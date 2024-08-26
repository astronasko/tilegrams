// Dictionary to store the unique integer assignment for each FIPS code
const fipsMap = {};
let nextInt = 0;

/** Return a color from a cyclic palette for a given geo code */
function fipsColor(fips) {
  // If the FIPS code has not been encountered before, assign it the next integer
  if (!(fips in fipsMap)) {
    fipsMap[fips] = nextInt++;
  }

  const colors = [
    '#00FF00',
    '#0000FF',
    '#FF0000',
    '#01FFFE',
    '#FFA6FE',
    '#FFDB66',
    '#006401',
    '#010067',
    '#95003A',
    '#007DB5',
    '#FF00F6',
    '#774D00',
    '#90FB92',
    '#0076FF',
    '#D5FF00',
    '#FF937E',
    '#6A826C',
    '#FF029D',
    '#FE8900',
    '#7A4782',
    '#7E2DD2',
    '#85A900',
    '#FF0056',
    '#A42400',
    '#00AE7E',
    '#683D3B',
    '#BDC6FF',
    '#BDD393',
    '#00B917',
    '#9E008E',
    '#C28C9F',
    '#FF74A3',
    '#01D0FF',
    '#004754',
    '#E56FFE',
    '#788231',
    '#0E4CA1',
    '#91D0CB',
    '#BE9970',
    '#968AE8',
    '#BB8800',
    '#43002C',
    '#DEFF74',
    '#00FFC6',
    '#FFE502',
    '#620E00',
    '#008F9C',
    '#98FF52',
    '#7544B1',
    '#B500FF',
    '#00FF78',
    '#FF6E41',
    '#005F39',
    '#6B6882',
    '#5FAD4E',
    '#A75740',
    '#FFB167',
    '#009BFF',
    '#E85EBE',
  ];
  const scaleTo = colors.length;

  // Get the unique integer assigned to this FIPS code
  const number = fipsMap[fips];

  // Get the index in the color palette
  const colorIndex = number % scaleTo;
  return colors[colorIndex];
}

/** Create DOM element. Options may include 'id' */
function createElement(options) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.id = options.id
  return div
}

function startDownload({filename, content, mimeType}) {
  const link = document.createElement('a')
  document.body.appendChild(link)
  link.setAttribute('href', `data:${mimeType},${content}`)
  link.setAttribute('download', filename)
  link.click()
  document.body.removeChild(link)
}

/** Update memoized bounds if exceeded by bounds */
function updateBounds(memoBounds, bounds) {
  for (let lim = 0; lim < 2; lim++) {       // limit (0 = min; 1 = max)
    for (let dim = 0; dim < 2; dim++) {     // dimension (0 = x; 1 = y)
      memoBounds[lim][dim] =
        Math[lim === 0 ? 'min' : 'max'](memoBounds[lim][dim], bounds[lim][dim])
    }
  }
}

/** Check if point is within corner bounds (of format [[0, 0], [100, 100]]) */
function checkWithinBounds(point, bounds) {
  for (let lim = 0; lim < 2; lim++) {       // limit (0 = min; 1 = max)
    for (let dim = 0; dim < 2; dim++) {     // dimension (0 = x; 1 = y)
      if (lim === 0 && point[dim] < bounds[lim][dim]) {
        return false
      } else if (lim === 1 && point[dim] > bounds[lim][dim]) {
        return false
      }
    }
  }
  return true
}

/** Convert array of key,value objects (eg: [{key: 0, value: 0}]) to hash for quick lookup */
function hashFromData(data) {
  const dataHash = {}
  data.forEach((datum) => {
    dataHash[datum.key] = datum.value
  })
  return dataHash
}

function checkDevEnvironment() {
  const devPort = 8080 // should match whatever port webpack-dev-server is running on
  return parseInt(document.location.port, 10) === devPort
}
const _isDevEnvironment = checkDevEnvironment() // eslint-disable-line no-underscore-dangle

function isDevEnvironment() {
  return _isDevEnvironment
}

module.exports = {
  fipsColor,
  createElement,
  startDownload,
  updateBounds,
  checkWithinBounds,
  hashFromData,
  isDevEnvironment,
}
