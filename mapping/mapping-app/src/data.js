import deptData from './data_0.json';
import muniData from './data_1.json';

                                                                           
const getDeptData = (geoData) => {                                         
  const idx = Object.values(deptData['prov']).indexOf(geoData.NAME_1)   
  return {
    pol1: deptData['pol1'][idx],
    //ww1: deptData['ww1'][idx],
    indig: deptData['indig'][idx]
  }
}                                                                      


const getMuniData = (geoData) => {
	const locale = ( geoData.NAME_2 + ', ' + geoData.NAME_1 )               
	const idx = Object.values(muniData['municipio']).indexOf(locale)
  return {
    pol1: muniData['pol1'][idx],
    www1: muniData['www1'][idx],
    indig: muniData['indig'][idx]
  }

}

const getData = (geoData) => {
  console.log(geoData)
  console.log(geoData.NAME_2)
  if(geoData.NAME_2) {
    console.log("MUNI")
    return getMuniData(geoData)
  } else {
    //console.log("DEPT")
    return getDeptData(geoData)
  }
}

export default getData

