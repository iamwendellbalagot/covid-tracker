import React from 'react';
import './CasesCards.css';

import numeral from 'numeral';

function CasesCards({caseType, caseName, today, total, cardCliked, active}) {
    return (
        <div className={`card ${active && 'card__clicked'}`} onClick={() => cardCliked(caseType)} >
            <p>{caseName}</p>
            <h3>{numeral(today).format('0,0')}</h3>
            <span>Total: {numeral(total).format('0,0')}</span>
        </div>
    )
}

export default CasesCards;
