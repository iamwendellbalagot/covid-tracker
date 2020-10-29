import React from 'react';
import './CasesTable.css';

function CasesTable({countries}) {
    return (
        <div className='table'>
            <h3>Live Cases by Country</h3>
            <div className='table__cases'>
                {countries?.map(country =>(
                    <tr key ={country.country}>
                        <td>{country.country}</td>
                        <strong><td>{country.cases}</td></strong>
                    </tr>
                ))}
                
            </div>
        </div>
    )
}

export default CasesTable;
