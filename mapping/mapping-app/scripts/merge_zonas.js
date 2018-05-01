const geoData = require('./GT_1.json')
const topojson = require('topojson')
const fs = require('fs')

let city_geos = geoData.objects.GTM_adm2.geometries.filter( 
  geo => geo.properties.NAME_2.indexOf('ZONA') !== -1)

let noncity_geos = geoData.objects.GTM_adm2.geometries.filter( 
  geo => geo.properties.NAME_2.indexOf('ZONA') === -1)

const merged = topojson.mergeArcs(geoData, city_geos)

let guate = city_geos[0]
guate.arcs = merged.arcs[0]
guate.properties.NAME_2 = 'Guatemala' 

noncity_geos.push(guate)

geoData.objects.GTM_adm2.geometries = noncity_geos



fs.open('../public/GT_1.json', 'w', 
  (err, fd) => { fs.write(fd, JSON.stringify(geoData), 
    () => fs.close(fd))
  }
)
