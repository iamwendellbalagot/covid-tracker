import React from 'react';
import './Home.css';

import Header from '../../components/Header/Header';
import CasesCards from '../../components/CasesCards/CasesCards';
import Map from '../../components/Map/Map';

function Home() {
    return (
        <div className='home'>
            <div className='home__left'>
                <Header />
                <div className='home__cards'>
                    <CasesCards caseType='Confirmed cases' today={32443} total={87345} />
                    <CasesCards caseType='Recovered cases' today={45654} total={567345} />
                    <CasesCards caseType='Deaths' today={435} total={4345} />
                </div>
                <Map />
            </div>
            <div className='home__right'>
                <div className='right__livecases'></div>
                <div className='right__worldNewCases'></div>
            </div>
        </div>
    )
}

export default Home;
