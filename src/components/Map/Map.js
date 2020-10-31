import React from 'react';
import './Map.css';

import numeral from 'numeral';
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';

function Map({center, zoom, countries, caseType}) {

    

    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                {countries?.map(country =>(
                    <Circle
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    color={caseType==='recovered'? 'lightgreen': 'salmon'}
                    fillColor={caseType==='recovered'? 'green': 'salmon'}
                    fillOpacity={0.4}
                    radius={Math.sqrt(country[caseType]) * 400}
                    >
                        <Popup>
                            <div className='popup'>
                                <h3>{country.country}</h3>
                                <div className='popup__cases'>
                                    <span>Total cases: </span>
                                    <p>{numeral(country.cases).format('0,0')}</p>
                                </div>
                                <div className='popup__cases'>
                                    <span>Recovered: </span>
                                    <p>{numeral(country.recovered).format('0,0')}</p>
                                </div>
                                <div className='popup__cases'>
                                    <span>Deaths: </span>
                                    <p>{numeral(country.deaths).format('0,0')}</p>
                                </div>
                            </div>
                        </Popup>

                    </Circle>
                ))}
            </LeafletMap>   
        </div>
    )
}

export default Map