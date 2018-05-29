const commonCodes = lang => {
  return {
    prot3: {
      code: 'prot3',
      label: lang =='en' ? 'Protest attendance': 'spansih version',
      text: "In the last 12 months, have you participated in a public demonstration or protest?",
      low: 0,
      high: 1,
    },
    pol1: {
      code: 'pol1',
      label: lang == 'en' ? 'Interest in politics': 'spanish pol',
      text: 'How much interest do you have in politics?',
      low: 0,
      high: 3,
    },
    www1: {
      code: 'www1',
      label: lang == 'en' ? 'Internet use': 'spanish version',
      text: 'How frequently do you use the internet?',
      low: 0,
      high: 4,
    },
    indig: {
      code: 'indig',
      label: lang == 'en' ? 'Indigenous identity': 'spansih version',
      text: 'Are you indigenous?',
      low: 0,
      high: 1,
    },
    np1: {
      code: 'np1',
      label: lang == 'en' ? 'Townhall attendance': 'spansih version',
      text: 'Have you attendad an open townhall in the past 12 months?',
      low: 0,
      high: 1
    },
    vb1: {
      code: 'vb1',
      label: lang == 'en' ? 'Voter registration': 'spansih version',
      text: 'Are you registrered to vote?',
      low: 1,
      high: 2
    },
    vb2: {
      code: 'vb2',
      label: lang == 'en' ? 'Voter turnout': 'spansih version',
      text: 'Did you vote in the 1st round of the last election?',
      low: 0,
      high: 1
    },
    eff1: {
      code: 'eff1',
      label: lang == 'en' ? 'Gov. cares': 'spansih version',
      text: 'Those that govern the country care about what you think',
      low: 0,
      high: 5
    },
    eff2: {
      code: 'eff2',
      label: lang == 'en' ? 'Know political issues': 'spansih version',
      text: 'You feel you understand the most important political issues facing the country',
      low: 0,
      high: 5
    }
  }
}




const codes17 = lang => {
  return {
    guaprot1: {
      code: 'guaprot1',
      label: lang == 'en' ? '2015 protest': 'spansih version',
      text: 'Did you participate in the 2015 protests?',
      low: 0,
      high: 1
    },
  }
}

const codes14 = lang => {
  return {}
}

export const getVars = (year, lang) => {
  switch(year) {
    case '2017':
      return Object.assign({}, commonCodes(lang), codes17(lang));
      break;
    case '2014':
      return Object.assign({}, commonCodes(lang), codes14(lang));
      break;
    default:
      throw "INVALID YEAR SELECT"
      break;
  }
}
