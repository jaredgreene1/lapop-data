const GT_2014 = {
  'townhall attendance': 'NP1',
  'protest attendance': 'Prot3',
  'interest in politics': 'POL1',
  'town': 'MUNICIPIO'
}

export const codes17 = {
  prot3: {
    code: 'prot3',
    label:'protest attendance',
    text: "In the last 12 months, have you participated in a public demonstration or protest?",
    low: 0,
    high: 1,
  },
  pol1: {
    code: 'pol1',
    label: 'interest in politics',
    text: 'How much interest do you have in politics?',
    low: 0,
    high: 3,
  },
  www1: {
    code: 'www1',
    label: 'internet use',
    text: 'How frequently do you use the internet?',
    low: 0,
    high: 4,
  },
  indig: {
    code: 'indig',
    label: 'indigenous identity',
    text: 'Are you indigenous?',
    low: 0,
    high: 1,
  },
}

export const getVars = year => {
  switch(year) {
    case '2017':
      return codes17;
      break;
    default:
      throw "INVALID YEAR SELECT"
      break;
  }
}
