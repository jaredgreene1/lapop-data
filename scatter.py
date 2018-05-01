import matplotlib.pyplot as plt
import numpy as np
import matplotlib

import data_prep


data_vars = {
  'protest': ('prot3', "% of muni that attended a protest in last 12 months", 'Protest Occurance'),
  'internet': ('www1', "frequency of internet use", 'Internet Usage'),
  'indigenous': ('indig', "% of muni that identifies as indigenous", 'Indigenous Concentration'),
  'political interest': ('pol1', "level of interest in politics", 'Political Interest'),
  '2015 protests': ('guaprot1', "% of muni that participated in 2015 protests", 'Participation in 2015 Protests')
}




def scatter(data, x_var, y_var):
  plt.scatter(data[x_var[0]], data[y_var[0]], 8)
  plt.xlabel(x_var[1])
  plt.ylabel(y_var[1])

  plt.title(("{} vs {}").format(x_var[2], y_var[2]))

  plt.show()


def main():
  data = data_prep.get_data('municipio', year='2014')
  scatter(data, data_vars['protest'], data_vars['internet'])
  scatter(data, data_vars['indigenous'], data_vars['internet'])
#  scatter(data, data_vars['2015 protests'], data_vars['political interest'])
  scatter(data, data_vars['protest'], data_vars['political interest'])
  scatter(data, data_vars['protest'], data_vars['2015 protests'])
  
  input("press enter to close chart")


if __name__ == '__main__':
  main()






