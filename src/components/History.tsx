import React, {useEffect, useState} from 'react'
import "./History.css";


export const History: React.FC = ({history, selectElementFromHistory }: {history: string[], selectElementFromHistory}) => { 
    return (
        <>
            {history.length > 0 
            ? 
                <>
                    <div className="title">Recent Searches</div>
                    {history.map((e, index) => <div className="search-item" key={index} onClick={()  => {selectElementFromHistory(e)}}>{e}</div>)}
                </>
            :
                <div  className="instructions">You don't have any search yet</div>
            }
        </>
    );
}
