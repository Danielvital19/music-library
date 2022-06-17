import React, {useEffect, useState} from 'react'
import LibraryService from '../services/LibraryService';
import { Release } from './Release'
import ITrackData from '../types/Track';
import "./Home.css";


export const Home: React.FC = ({ message }: {message: string;}) => { 
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);


    const getData = async () => {
        const response = await LibraryService.get('Coldplay', page);
        setResults([...response.results]);
    }

    useEffect(() => {
        getData();
    },[]);

    useEffect(() => {
        getData();
    },[page]);

    console.log(results);

    return(
        <>
            <div className='results'>
                {results &&
                    results.map((release, index) => (
                        <Release key={index} cover={release.cover_image} title={release.title} year={release.year} styles={release.style} country={release.country}/>   
                    ))}
            </div>
            <div className="pager-container">
                <div className="pager">
                    <button onClick={() => {setPage(page - 1)}}>
                        previous
                    </button>
                    page {page}
                    <button onClick={() => {setPage(page + 1)}}>
                        next
                    </button>
                </div>
            </div>
        </>
        
    );
}


