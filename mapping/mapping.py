# source (tutorial used): http://www.datadependence.com/2016/06/creating-map-visualisations-in-python/
# source (tool to find coordinates of viewport): http://boundingbox.klokantech.com 


import matplotlib.cm
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from matplotlib.patches import Polygon
from mpl_toolkits.basemap import Basemap
from matplotlib.collections import PatchCollection
from matplotlib.colors import Normalize

import data_prep

dept = {
  'shapefill':'shapefills/DIVA-GIS/GTM_adm1',
  'code':'prov',
  'areas_column': 'NAME_1'
  }

muni = {
  'shapefill': 'shapefills/DIVA-GIS/GTM_adm2',
  'code': 'municipio',
  'areas_column': 'NAME_2'
  }

def build_map(shapefill):
  fig, ax = plt.subplots(figsize=(150,300))

  m = Basemap(resolution='c',
              projection='merc',
              lat_0=14.1064, 
              lon_0=-90.4135,
              llcrnrlon=-92.4135,
              llcrnrlat=13.7,
              urcrnrlon=-88.0684,
              urcrnrlat=18.1064)

  m.drawmapboundary(fill_color='#46bcec')
  m.fillcontinents(color='#f2f2f2', lake_color='#46bcec')
  m.drawcountries()
  m.readshapefile(shapefill,'areas')
  return (m, fig, ax)


def data_to_map_loc(m, data, grouping):
  '''ties survey data to locations on the map'''

  #TODO (jg 4/25/18): Some data is not applied to the map due to naming mismatches
  df_poly = pd.DataFrame({
    'shapes': [Polygon(np.array(shape), True) for shape in m.areas],
    grouping['code']: [area[grouping['areas_column']] for area in m.areas_info]
  })
  df_poly = df_poly.merge(data, on=grouping['code'], how='left').dropna() #INVESTIGATE
  return df_poly


def draw_data(df_poly, ax, code):
  '''plots data on the map'''
  cmap = plt.get_cmap('Blues')
  pc = PatchCollection(df_poly.shapes, zorder=2)
  norm = Normalize()
  pc.set_facecolor(cmap(norm(df_poly[code].values)))
  ax.add_collection(pc)
  
  # add title
  plt.title(("Map of GT 2014 LAPOP data: code {}").format(code))

  # add color bar
  mapper = matplotlib.cm.ScalarMappable(norm=norm, cmap=cmap)
  mapper.set_array(df_poly[code])
  cb = plt.colorbar(mapper, shrink=0.4, ticks=[0, 1])
  cb.set_label('relative intensity', rotation=270, labelpad=12) 

def map_data(data, code, grouping):
  m, fig, ax = build_map(grouping['shapefill'])
  poly_and_data = data_to_map_loc(m, data, grouping)
  draw_data(poly_and_data, ax, code)
  fig.show()


def main(grouping):
  '''build a regional map'''

  codes = ['prot3', 'indig']

  data = data_prep.get_data(grouping['code'])
  [ map_data(data, code, grouping) for code in codes]
  input("press any key to continue")


if __name__ == '__main__':
  print(str(sys.argv))
  
  if sys.argv[1] == 'd':
    grouping = dept 
  elif sys.argv[1] == 'm':
    grouping = muni 
  else:
    print("Please indicate borders to draw: 1, 2, or 3");
    exit(1)
  main(grouping)
