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

    useEffect(() =>{
        axios.get('/countries')
        .then(res =>{
            console.log(res.data[0])
            setCountries(res.data)
        })
    }, [])

    return (
        <div className='home'>
            <div className='home__left'>
                <Header countries={countries}/>
                <div className='home__cards'>
                    <CasesCards caseType='Confirmed cases' today={32443} total={87345} />
                    <CasesCards caseType='Recovered cases' today={45654} total={567345} />
                    <CasesCards caseType='Deaths' today={435} total={4345} />
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
