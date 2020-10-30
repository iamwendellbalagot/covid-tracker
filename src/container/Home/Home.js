import React, { useState, useEffect } from 'react';
import './Home.css';

import Header from '../../components/Header/Header';
import CasesCards from '../../components/CasesCards/CasesCards';
import Map from '../../components/Map/Map';
import CasesTable from '../../components/CasesTable/CasesTable';
import LinePlot from '../../components/LinePlot/LinePlot';

import axios from '../../axios';


function Home() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [data, setData] = useState({});

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
            let values = Object.values(res.data.cases)
            let i = 0;
            values.forEach(val => {
                newValues.push(val - i);
                i = val;
            });
            
            setData({
                dates:Object.keys(res.data.cases),
                values: Object.values(newValues)
            })
        })
    }, [])

    const handleCardsInfo = (country) =>{
        if (country !== 'worldwide'){
            axios.get(`/countries/${country}`)
            .then(res =>{
                setCountry(res.data);
            })
            .catch(err => console.log(err))

            axios.get(`/historical/${country}?lastdays=all`)
            .then(res =>{
                let newValues = []
                let values = Object.values(res.data.timeline.cases)
                let i = 0;
                values.forEach(val => {
                    newValues.push(val - i);
                    i = val;
                });
                setData({
                    dates:Object.keys(res.data.timeline.cases),
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
                let values = Object.values(res.data.cases)
                let i = 0;
                values.forEach(val => {
                    newValues.push(val - i);
                    i = val;
                });
                
                setData({
                    dates:Object.keys(res.data.cases),
                    values: Object.values(newValues)
                })
            })
        }
    }

    return (
        <div className='home'>
            <div className='home__left'>
                <Header countries={countries} getCountry={handleCardsInfo}/>
                <div className='home__cards'>
                    <CasesCards caseType='Confirmed cases' today={country?.todayCases} total={country?.cases} />
                    <CasesCards caseType='Recovered cases' today={country?.todayRecovered} total={country?.recovered} />
                    <CasesCards caseType='Deaths' today={country?.todayDeaths} total={country?.deaths} />
                </div>
                <Map />
            </div>
            <div className='home__right'>
                <CasesTable countries={countries}/>
                <LinePlot countryData={data} />
            </div>
        </div>
    )
}

export default Home;
