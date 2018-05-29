import React from 'react';

//Contains text for application - largest use case is language switching


export const introText = lang => {
  switch(lang) {
    case 'en':
      return introText_en
    case 'es':
      return introText_es
    default:
      throw "Invalid language";
  }
}



const introText_en = {
  'About this application': (
      <div>
        <text> 

          Welcome to the Networks of Guatemala Data Explorer! 

          <br /> <br />

          The NoG Data Explorer is used to perform basic data 
          visualization and analysis for population 
          information around Guatemala.

          <br /> <br />

          Get started by selecting a view and your configuration 
          variables in the panel below. Feel free to click through this 
          menu for more information about the different 
          views, project, and data.

          Have fun!
        </text>
      </div>),
  'Data source': (
      <div>
        <text>
          The datasets that support the NoG Data Explorer come from
          The AmericasBarometer Survey which is run by the Latin American
          Public Opinion Project (LAPOP).

          <br /> <br />

          The AmericasBarometer is a scientifically rigorous comparative 
          survey that covers all of North, Central, and South America. 
          In the case of Guatemala, LAPOP has been running data collection 
          every two years since 1992. 

          <br /> <br /> 

          For more information regarding LAPOP or The AmericasBarometer 
          <a target='_blank' href='https://www.vanderbilt.edu/lapop/'> visit their website </a> 
          where you can read more about the survey methodology
          and download the raw data that supports this application
        </text>
      </div>),
   'Who are we': (
      <div>
        <text>
          This application is part of an ongoing research project called 
          Networks of Guatemala investigating the impact that internet 
          performance has on political engagement in indigenous communities. 
          
          <br /> <br />

          The project is supported by Vint Cerf and
          The Marconi Society through an Internet and Democracy Research 
          Grant and is running from January 2018 to December 2018.

          <br /> <br />

          For more information take a look at the 
          <a target='_blank' href='http://www.NetworksOfGuatemala.com'> Networks of Guatemala Blog </a>
          or reach out to our PI, 
          <a href='mailto:JaredGreene1@gmail.com'> Jared Greene </a>.
        </text>
      </div>)
  }

const introText_es = {}
