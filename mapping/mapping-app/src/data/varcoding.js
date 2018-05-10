const GT_2014 = {
  'townhall attendance': 'NP1',
  'protest attendance': 'Prot3',
  'interest in politics': 'POL1',
  'town': 'MUNICIPIO'
}

export const codes17 = {
  prot3: {
    code: 'prot3',
    label:'Protest attendance',
    text: "In the last 12 months, have you participated in a public demonstration or protest?",
    low: 0,
    high: 1,
  },
  pol1: {
    code: 'pol1',
    label: 'Interest in politics',
    text: 'How much interest do you have in politics?',
    low: 0,
    high: 3,
  },
  www1: {
    code: 'www1',
    label: 'Internet use',
    text: 'How frequently do you use the internet?',
    low: 0,
    high: 4,
  },
  indig: {
    code: 'indig',
    label: 'Indigenous identity',
    text: 'Are you indigenous?',
    low: 0,
    high: 1,
  },
  guaprot1: {
    code: 'guaprot1',
    label: '2015 protest',
    text: 'Did you participate in the 2015 protests?',
    low: 0,
    high: 1
  },
  np1: {
    code: 'np1',
    label: 'Townhall attendance',
    text: 'Have you attendad an open townhall in the past 12 months?',
    low: 0,
    high: 1
  },
  vb1: {
    code: 'vb1',
    label: 'Voter registration',
    text: 'Are you registrered to vote?',
    low: 1,
    high: 2
  },
  vb2: {
    code: 'vb2',
    label: 'Voter turnout',
    text: 'Did you vote in the 1st round of the last election?',
    low: 0,
    high: 1
  },
  eff1: {
    code: 'eff1',
    label: 'Gov. cares',
    text: 'Those that govern the country care about what you think',
    low: 0,
    high: 5
  },
  eff2: {
    code: 'eff2',
    label: 'Know political issues',
    text: 'You feel you understand the most important political issues facing the country',
    low: 0,
    high: 5
  }
}

export const codes14 = {
  prot3: {
    code: 'prot3',
    label:'Protest attendance',
    text: "In the last 12 months, have you participated in a public demonstration or protest?",
    low: 0,
    high: 1,
  },
  pol1: {
    code: 'pol1',
    label: 'Interest in politics',
    text: 'How much interest do you have in politics?',
    low: 0,
    high: 3,
  },
  www1: {
    code: 'www1',
    label: 'Internet use',
    text: 'How frequently do you use the internet?',
    low: 0,
    high: 4,
  },
  indig: {
    code: 'indig',
    label: 'Indigenous identity',
    text: 'Are you indigenous?',
    low: 0,
    high: 1,
  },
  np1: {
    code: 'np1',
    label: 'Townhall attendance',
    text: 'Have you attendad an open townhall in the past 12 months?',
    low: 0,
    high: 1
  },
  vb1: {
    code: 'vb1',
    label: 'Voter registration',
    text: 'Are you registrered to vote?',
    low: 1,
    high: 2
  },
  vb2: {
    code: 'vb2',
    label: 'Voter turnout',
    text: 'Did you vote in the 1st round of the last election?',
    low: 0,
    high: 1
  },
  eff1: {
    code: 'eff1',
    label: 'Gov. cares',
    text: 'Those that govern the country care about what you think',
    low: 0,
    high: 5
  },
  eff2: {
    code: 'eff2',
    label: 'Know political issues',
    text: 'You feel you understand the most important political issues facing the country',
    low: 0,
    high: 5
  }
}

export const getVars = year => {
  switch(year) {
    case '2017':
      return codes17;
      break;
    case '2014':
      return codes14;
      break;
    default:
      throw "INVALID YEAR SELECT"
      break;
  }
}
