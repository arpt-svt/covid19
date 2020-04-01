import React, { useState, useEffect } from 'react';
import { StyledSpinnerNext } from "baseui/spinner";
import * as timeago from 'timeago.js';
import logo from './../NM_logo.png';



import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";

import {
  Label1,
  Label2,
  Label4,
} from 'baseui/typography';

import {
  Unstable_StatefulDataTable,
  CategoricalColumn,
  NumericalColumn,
} from 'baseui/data-table';

import { StyledLink } from "baseui/link";


import { useStyletron } from 'baseui';

import './Home.css';


function addCommas(nStr) {
  nStr += '';
  let x = nStr.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

const columns = [
  CategoricalColumn({
    title: 'Country',
    mapDataToValue: (data) => data.Country,
  }),
  NumericalColumn({
    title: 'Confirmed',
    mapDataToValue: (data) => data.TotalConfirmed,
  }),
  NumericalColumn({
    title: 'Recovered',
    mapDataToValue: (data) => data.TotalRecovered,
  }),
  NumericalColumn({
    title: 'Deceased',
    mapDataToValue: (data) => data.TotalDeaths,
  })
]


function Home() {
  const [countriesData, setcountriesData] = useState([]);
  const [indiaCases, setIndiaCases] = useState({});
  const [lastUpdated, setLastUpdated] = useState('')
  const [worldCases, setWorldCases] = useState({})
  const [error, setError] = useState(false);
  const [css] = useStyletron();

  const extraMarginContent =css({marginTop: '25px', marginBottom: '10px'})
  const smallMargin = css({ marginTop: '6px' })


  useEffect(() => {
    // Update the document title using the browser API
    let countries = []

    fetch("https://api.covid19api.com/summary")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          let ws = {
            TotalConfirmed: 0,
            NewConfirmed: 0,
            TotalRecovered: 0,
            NewRecovered: 0,
            TotalDeaths: 0,
            NewDeaths: 0
          }
          for (let country of result.Countries) {
            if (country.Country === '') continue
            if (country.Slug === 'india'){
              setIndiaCases(country)
            }

            ws.TotalConfirmed += country.TotalConfirmed
            ws.TotalRecovered += country.TotalRecovered
            ws.TotalDeaths += country.TotalDeaths
            ws.NewConfirmed += country.NewConfirmed
            ws.NewRecovered += country.NewRecovered
            ws.NewDeaths += country.NewDeaths

            countries.push({
              id: country.Slug,
              data: country
            })
          }
          countries.sort((a, b) => (a.data.TotalConfirmed < b.data.TotalConfirmed) ? 1 : -1)
          let lu = timeago.format(result.Date)
          setLastUpdated(lu)
          setWorldCases(ws)
          setcountriesData(countries)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(true)
        }
      )
  }, []);

  let indiaDisplay = '';
  let worldDisplay = ''
  let tableDisplay = (
  <div className={css({ justifyContent: 'center', display: 'flex', marginTop: '30vh'})}>
    <StyledSpinnerNext size="100px"/></div>);

  if (worldCases.TotalConfirmed){
    worldDisplay = (
      <div className={css({ width: '95vw', margin: 'auto' })}>
        <Label4 color='green' className={smallMargin}>Last Updated about {lastUpdated}</Label4>
        <Label1 className={extraMarginContent}><span role="img" aria-label="Globe">🌎</span>World</Label1>
        <div className={css({ justifyContent: 'space-between', display: 'flex' })}>
          <div>
            <Label2 color='red' className={smallMargin}>Confirmed</Label2>
            <Label2 color='red' className={smallMargin}>{addCommas(worldCases.TotalConfirmed)}</Label2>
            <Label4 color='red' className={smallMargin}>[{worldCases.NewConfirmed && '+'}{addCommas(worldCases.NewConfirmed)}]</Label4>
          </div>
          <div >
            <Label2 color='green' className={smallMargin}>Recovered</Label2>
            <Label2 color='green' className={smallMargin}>{worldCases.TotalRecovered}</Label2>
            <Label4 color='green' className={smallMargin}>[{worldCases.NewRecovered && '+'}{addCommas(worldCases.NewRecovered)}]</Label4>
          </div>
          <div>
            <Label2 color='gray' className={smallMargin}>Deceased</Label2>
            <Label2 color='gray' className={smallMargin}>{addCommas(worldCases.TotalDeaths)}</Label2>
            <Label4 color='gray' className={smallMargin}>[{worldCases.NewDeaths && '+'}{addCommas(worldCases.NewDeaths)}]</Label4>
          </div>
        </div>
      </div>
    )
  }

  if (indiaCases.TotalConfirmed){
    console.log(indiaCases)
    indiaDisplay = (
      <div className={css({ width: '95vw', margin: 'auto' })}>
        <Label1 className={extraMarginContent}><span role="img" aria-label="flag">🇮🇳</span>India</Label1>
        <div className={css({ justifyContent: 'space-between', display: 'flex' })}>
          <div>
            <Label2 color='red' className={smallMargin}>Confirmed</Label2>
            <Label2 color='red' className={smallMargin}>{addCommas(indiaCases.TotalConfirmed)}</Label2>
            <Label4 color='red' className={smallMargin}>[{indiaCases.NewConfirmed && '+'}{addCommas(indiaCases.NewConfirmed)}]</Label4>
          </div>
          <div >
            <Label2 color='green' className={smallMargin}>Recovered</Label2>
            <Label2 color='green' className={smallMargin}>{addCommas(indiaCases.TotalRecovered)}</Label2>
            <Label4 color='green' className={smallMargin}>[{indiaCases.NewRecovered && '+'}{addCommas(indiaCases.NewRecovered)}]</Label4>
          </div>
          <div>
            <Label2 color='gray' className={smallMargin}>Deceased</Label2>
            <Label2 color='gray' className={smallMargin}>{addCommas(indiaCases.TotalDeaths)}</Label2>
            <Label4 color='gray' className={smallMargin}>[{indiaCases.NewDeaths && '+'}{addCommas(indiaCases.NewDeaths)}]</Label4>
          </div>
        </div>
        <Label1 className={extraMarginContent}>All Countries</Label1>
      </div>
    )
  }

  if (countriesData.length > 0) {
    tableDisplay = (
      <div className={css({ height: '85vh' })}>
      <Unstable_StatefulDataTable columns={columns} rows={countriesData} />
    </div>)
  }

  return (
    <div>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.center}>
        <StyledNavigationItem>
        <img src={logo} height="32px"/>
          </StyledNavigationItem>
          <StyledNavigationItem style={{paddingLeft: '10px'}}>
          <StyledLink
          className={css({textDecoration: 'None'})}
           href="/">
             COVID-19 TRACKER</StyledLink></StyledNavigationItem>
       
        <StyledNavigationItem>
          
        </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>

      {worldDisplay}

      {indiaDisplay}

      {tableDisplay}

      {error &&  <Label2 className={smallMargin}>Something went wrong. Please try again</Label2>}

      <div className={css({ justifyContent: 'center', display: 'flex', marginTop: '20px', marginBottom: '20px'})}>
        Powered by&nbsp;
        <StyledLink href="http://netmusk.com" target="_blank" color="blue"
        >NetMusk</StyledLink>
      </div>

    </div>
  );
}

export default Home;
