import deptData from './data_0.json';
import muniData from './data_1.json';

import { codes17 } from './varcoding'
                                                                           
const getDeptDataByLocation = (geoData) => {                                         
  const idx = Object.values(deptData['prov']).indexOf(geoData.NAME_1)   
  return Object.keys(codes17).reduce((data, key) => { 
      data[key] = deptData[key][idx] 
      return data}, {})
}

const getMuniDataByLocation = (geoData) => {
	const locale = ( geoData.NAME_2 + ', ' + geoData.NAME_1 )               
	const idx = Object.values(muniData['municipio']).indexOf(locale)
  return Object.keys(codes17).reduce((data, key) => { 
      data[key] = muniData[key][idx] 
      return data}, {})
}

export const getDataByLocation = (geoData) => {
  if(geoData.NAME_2) {
    return getMuniDataByLocation(geoData)
  } else {
    return getDeptDataByLocation(geoData)
  }
}

export const getData = (grouping) => {
  switch(grouping) {
    case 'municipio':
      return muniData;
      break;
    case 'departamento':
      return deptData
      break;
    default:
      throw "Invalid data grouping: " + grouping
  }
}
