import React from 'react';
import './Header.css';

import {FormControl, MenuItem, Select} from '@material-ui/core';

function Header() {
    return (
        <div className='header'>
            <h1>COVID-TRACKER</h1>
            <FormControl>
                <Select variant='outlined' className='header__select'>
                    <MenuItem>Philippines</MenuItem>
                    <MenuItem>Thailand</MenuItem>
                    <MenuItem>Vietnam</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default Header;
