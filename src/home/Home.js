import React, { useState, useEffect } from 'react';
import { Spinner } from "baseui/spinner";
import * as timeago from 'timeago.js';



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
  const [indiaCases, setIndiaCases] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('')
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
          for (let country of result.Countries) {
            if (country.Country === '') continue
            if (country.Slug === 'india'){
              console.log(country)
              setIndiaCases(country)
            }
            countries.push({
              id: country.Slug,
              data: country
            })
          }
          let lu = timeago.format(result.Date)
          setLastUpdated(lu)
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

  let indiaDisplay = <Spinner />;
  let tableDisplay = (
  <div className={css({ justifyContent: 'center', display: 'flex' })}>
    <Spinner size="100px"/></div>);

  if (indiaCases.length !== {}){
    indiaDisplay = (
      <div className={css({ width: '95vw', margin: 'auto' })}>
        <Label4 color='green' className={smallMargin}>Last Updated about {lastUpdated}</Label4>
        <Label1 className={extraMarginContent}><span role="img" aria-label="flag">🇮🇳</span>India</Label1>
        <div className={css({ justifyContent: 'space-between', display: 'flex' })}>
          <div>
            <Label2 color='red' className={smallMargin}>Confirmed</Label2>
            <Label2 color='red' className={smallMargin}>{indiaCases.TotalConfirmed}</Label2>
            <Label4 color='red' className={smallMargin}>[{indiaCases.NewConfirmed && '+'}{indiaCases.NewConfirmed}]</Label4>
          </div>
          <div >
            <Label2 color='green' className={smallMargin}>Recovered</Label2>
            <Label2 color='green' className={smallMargin}>{indiaCases.TotalRecovered}</Label2>
            <Label4 color='green' className={smallMargin}>[{indiaCases.NewRecovered && '+'}{indiaCases.NewRecovered}]</Label4>
          </div>
          <div>
            <Label2 color='gray' className={smallMargin}>Deceased</Label2>
            <Label2 color='gray' className={smallMargin}>{indiaCases.TotalDeaths}</Label2>
            <Label4 color='gray' className={smallMargin}>[{indiaCases.NewDeaths && '+'}{indiaCases.NewDeaths}]</Label4>
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
          <StyledLink
          className={css({textDecoration: 'None'})}
           href="/">COVID-19 TRACKER</StyledLink></StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>

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
