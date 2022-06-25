import React, {useEffect, useState} from 'react'
import LibraryService from '../services/LibraryService';
import { Release } from './Release'
import ITrackData from '../types/Track';
import "./Home.css";
import { History } from './History';


export const Home: React.FC = () => {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [text, setText] = useState("");
    const [artist, setArtist] = useState("");
    const [history, setHistory] = useState([]);

    const getData = async (searchText: string) => {
        const response = await LibraryService.get(searchText, page);
        setResults([...response.results]);
    }

    useEffect(() => {
        getHistory();
    },[]);

    useEffect(() => {
        getData(text);
        getHistory();
    },[page]);

    const makeSearch = (): void => {
        setPage(1);
        setArtist(text)
        getData(text);
        addElementToHistory(text);
    };

    const addElementToHistory = (artist: string): void => {
        const newHistory = [artist, ...history]
        setHistory(newHistory);
        localStorage.setItem('history', JSON.stringify(newHistory));
    }

    const getHistory = (): void => {
        const persistantHistory = localStorage.getItem('history') || '[]';
        setHistory(JSON.parse(persistantHistory));
    }

    const selectElementFromHistory = (element: string): void => {
        setText(element);
        getData(element);
        setArtist(element)
    }

    return(
        <>
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search.."
                    value={text}
                    onChange={(e) => {setText(e.target.value)}}
                />
                <button type="submit" onClick={() => {text && makeSearch()}}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
            { !artist ?
                <div className="history">
                    <History history={history} selectElementFromHistory={selectElementFromHistory}/>
                </div>
                :
                <>
                    <div className='results'>
                        {results &&
                            results.map((release, index) => (
                                <Release key={index} cover={release.cover_image} title={release.title} year={release.year} styles={release.style} country={release.country}/>
                            ))}
                    </div>
                    <div className="pager-container">
                        <div className="pager">
                            <a className="pager-button" onClick={() => {page !== 1 && setPage(page - 1)}}>
                                {'<'}
                            </a>
                            Page {page}
                            <a className="pager-button"  onClick={() => {setPage(page + 1)}}>
                                {'>'}
                            </a>
                        </div>
                    </div>
                </>
            }
        </>

    );
}


