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
    const [worldwide, setWorldwide] = useState({});

    useEffect(() =>{
        axios.get('/countries')
        .then(res =>{
            setCountries(res.data)
        })

        axios.get('/all')
        .then(res =>{
            setWorldwide(res.data);
        })
    }, [])

    return (
        <div className='home'>
            <div className='home__left'>
                <Header countries={countries}/>
                <div className='home__cards'>
                    <CasesCards caseType='Confirmed cases' today={worldwide?.todayCases} total={worldwide?.cases} />
                    <CasesCards caseType='Recovered cases' today={worldwide?.todayRecovered} total={worldwide?.recovered} />
                    <CasesCards caseType='Deaths' today={worldwide?.todayDeaths} total={worldwide?.deaths} />
                </div>
                <Map />
            </div>
            <div className='home__right'>
                <CasesTable countries={countries}/>
                <LinePlot />
            </div>
        </div>
    )
}

export default Home;
