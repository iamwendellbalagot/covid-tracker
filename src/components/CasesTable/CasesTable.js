import React, { useEffect, useState } from 'react';
import './CasesTable.css';

function CasesTable({countries}) {
    const [sortedData, setSortedData] = useState(countries);
    useEffect(() =>{
        setSortedData(countries.sort((a,b) => a.cases > b.cases? -1 : 1))
    }, [countries])

    return (
        <div className='table'>
            <h3>Live Cases by Country</h3>
            <div className='table__cases'>
                {sortedData?.map(country =>(
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
