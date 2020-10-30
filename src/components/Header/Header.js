import React, { useState } from 'react';
import './Header.css';


import {FormControl, MenuItem, Select} from '@material-ui/core';

function Header({countries, getCountry}) {
    
    const [country, setCountry] = useState('worldwide');

    const handleCountryChange = (event) =>{
        setCountry(event.target.value)
        getCountry(event.target.value);
    }

    return (
        <div className='header'>
            <h1>COVID-TRACKER</h1>
            <FormControl>
                <Select 
                labelId="demo-customized-select-label" 
                variant='outlined' 
                className='header__select' 
                value={country} 
                onChange={handleCountryChange}>
                    <MenuItem value={'worldwide'} >Worldwide</MenuItem>
                    {countries?.map(c =>(
                        <MenuItem value={c.countryInfo.iso2} key={c.country}>{c.country}</MenuItem>
                    ))}
                    
                </Select>
            </FormControl>
        </div>
    )
}

export default Header;
