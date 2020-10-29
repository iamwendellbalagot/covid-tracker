import React from 'react';
import './CasesCards.css';

function CasesCards({caseType, today, total}) {
    return (
        <div className='card'>
            <p>{caseType}</p>
            <h3>{today}</h3>
            <span>{total}</span>
        </div>
    )
}

export default CasesCards;
