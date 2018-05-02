import deptData from './data_0.json';
import muniData from './data_1.json';

import { codes17 } from './varcoding'
                                                                           
const getDeptData = (geoData) => {                                         
  const idx = Object.values(deptData['prov']).indexOf(geoData.NAME_1)   
  return Object.keys(codes17).reduce((data, key) => { 
      data[key] = deptData[key][idx] 
      return data}, {})
}

const getMuniData = (geoData) => {
	const locale = ( geoData.NAME_2 + ', ' + geoData.NAME_1 )               
	const idx = Object.values(muniData['municipio']).indexOf(locale)
  return Object.keys(codes17).reduce((data, key) => { 
      data[key] = muniData[key][idx] 
      return data}, {})
}

const getData = (geoData) => {
  if(geoData.NAME_2) {
    return getMuniData(geoData)
  } else {
    return getDeptData(geoData)
  }
}

export default getData 

