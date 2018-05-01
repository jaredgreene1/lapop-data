

def does_muni_match(muniName):
  '''Takes a row of topoJSON data and a full muni name (muni, department)
  and returns a boolean on whether they match'''

  def _muni_matches(topo):
    locale = topo['properties']['NAME_2'] + ', ' + topo['properties']['NAME_1']
    print("Looking for: ", locale)
    return locale == muniName
  return _muni_matches


def get_muni_in_topo(topo, muni_name):
  topo_rows = topo['objects']['GTM_adm2']['geometries']
  return( list(filter(does_muni_match(muni_name), topo_rows)))


def clean_map(topo, data, newFileName):                            
  '''Takes a topoJSON file (like that created with mapshaper.com),         
    and adds lapop data to feature properties 
                                                                           
    this is meant as a one-off and only run to generate the file for  
    the mapping app'''
  new_dict = {}
  for idx, muni in enumerate(list(data['municipio'].values())):
    topo_row = get_muni_in_topo(topo, muni)
    if len(topo_row) != 1:                                                  
      raise(ValueError(("for muni {} found this: {}".format(muni, topo_row))))                     
    new_dict[topo_row[0]['properties']['ID_2']] = idx
  data['map_index'] = new_dict
  return data
                                                                         
                                                                          
def main():
  import json
  with open('data_1.json', 'r') as dfd, open('GT_1.json', 'r') as sfd:
    data = json.load(dfd)
    topo = json.load(sfd)

  return clean_map(topo, data, '')


def test_filter():
  data, topo = main()
  return res





