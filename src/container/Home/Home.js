import React, { useState, useEffect } from 'react';
import './Home.css';

import Header from '../../components/Header/Header';
import CasesCards from '../../components/CasesCards/CasesCards';
import Map from '../../components/Map/Map';
import CasesTable from '../../components/CasesTable/CasesTable';
import LinePlot from '../../components/LinePlot/LinePlot';
import axios from '../../axios';
import "leaflet/dist/leaflet.css";


function Home() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [data, setData] = useState({});
    const [mapCenter, setMapCenter] = useState({lat: 12.8797, lng: 121.7740 });
    const [mapZoom, setMapZoom] = useState(4);
    const [caseType, setCaseType] = useState('cases');

    useEffect(() =>{
        axios.get('/countries')
        .then(res =>{
            setCountries(res.data)
        })

        axios.get('/all')
        .then(res =>{
            setCountry(res.data);
        })

        axios.get('/historical/all?lastdays=all')
        .then(res => {
            let newValues = []
            let values = Object.values(res.data[caseType])
            let i = 0;
            values.forEach(val => {
                newValues.push(val - i);
                i = val;
            });
            
            setData({
                dates:Object.keys(res.data[caseType]),
                values: Object.values(newValues)
            })
        })
    }, [])

    useEffect(() =>{
        if (country.country){
            axios.get(`/historical/${country.country}?lastdays=all`)
            .then(res =>{
                let newValues = []
                let values = Object.values(res.data.timeline[caseType])
                let i = 0;
                values.forEach(val => {
                    newValues.push(val - i);
                    i = val;
                });
                setData({
                    dates:Object.keys(res.data.timeline[caseType]),
                    values: Object.values(newValues)
                })
            })
        }else {
            axios.get('/historical/all?lastdays=all')
            .then(res => {
                let newValues = []
                let values = Object.values(res.data[caseType])
                let i = 0;
                values.forEach(val => {
                    newValues.push(val - i);
                    i = val;
                });
                
                setData({
                    dates:Object.keys(res.data[caseType]),
                    values: Object.values(newValues)
                })
            })
        }
        
    }, [caseType])

    const handleCardsInfo = (country) =>{
        if (country !== 'worldwide'){
            axios.get(`/countries/${country}`)
            .then(res =>{
                setCountry(res.data);
                setMapCenter({
                    lat: res.data.countryInfo.lat,
                    lng: res.data.countryInfo.long
                })
            })
            .catch(err => console.log(err))

            axios.get(`/historical/${country}?lastdays=all`)
            .then(res =>{
                let newValues = []
                let values = Object.values(res.data.timeline[caseType])
                let i = 0;
                values.forEach(val => {
                    newValues.push(val - i);
                    i = val;
                });
                setData({
                    dates:Object.keys(res.data.timeline[caseType]),
                    values: Object.values(newValues)
                })
            })
        }else{
            axios.get('/all')
            .then(res =>{
                setCountry(res.data);
            })
            axios.get('/historical/all?lastdays=all')
            .then(res => {
                let newValues = []
                let values = Object.values(res.data[caseType])
                let i = 0;
                values.forEach(val => {
                    newValues.push(val - i);
                    i = val;
                });
                
                setData({
                    dates:Object.keys(res.data[caseType]),
                    values: Object.values(newValues)
                })
            })
        }
    }

    const handleCardClicked = (c) =>{
        setCaseType(c);
    };

    return (
        <div className='home'>
            <div className='home__left'>
                <Header countries={countries} getCountry={handleCardsInfo}/>
                <div className='home__cards'>
                    <CasesCards 
                        cardCliked={handleCardClicked} 
                        caseType='cases' caseName='Confirmed cases'
                        active={caseType === 'cases'} 
                        today={country?.todayCases} 
                        total={country?.cases} />
                    <CasesCards 
                        cardCliked={handleCardClicked} 
                        caseType='recovered' caseName='Recovered cases'
                        active={caseType === 'recovered'}  
                        today={country?.todayRecovered} 
                        total={country?.recovered} />
                    <CasesCards 
                        cardCliked={handleCardClicked} 
                        caseType='deaths' caseName='Deaths'
                        active={caseType === 'deaths'}  
                        today={country?.todayDeaths} 
                        total={country?.deaths} />
                </div>
                <Map center={mapCenter} zoom={mapZoom} countries={countries} caseType={caseType} />
            </div>
            <div className='home__right'>
                <CasesTable countries={countries}/>
                <LinePlot countryData={data} countryName={country.country} caseType={caseType}/>
            </div>
            <footer className='home__footer'>
                <a target='_blank' href='https://github.com/iamwendellbalagot' >Developer</a>
            </footer>
        </div>
    )
}

export default Home;
