import React, {useEffect, useState} from 'react'
import "./Release.css";


export const Release: React.FC = ({ title, cover, year, styles, country }: {title: string, cover: string, year: string, styles: any[], country: string}) => { 
    return (
        // <div className="release">
        //     <div>
        //         <img src={cover} alt="" height="90" width="90" /> 
        //     </div>
        //     <p>{title}</p>
        //     <div className="year-text">{year}</div>
        //     {style && <div className="type-text">{style}</div>}
        // </div>
        <div className="release">
            <div>
                <img src={cover} alt="" height="150" width="150" /> 
            </div>
            <div className="release-info-container">
                <div className="release-info">
                    <div className="year-text">{year}{country !== 'Unknown' && `, ${country}`}</div>
                    <div>{title}</div>
                    { styles?.length > 0 && <div className="type-text">{styles.join()}</div>}
                </div>
            </div>
           
        </div>
    );
}
