import React, {useEffect, useState} from 'react'
import LibraryService from '../services/LibraryService';
import { Release } from './Release'
import ITrackData from '../types/Track';
import "./Home.css";
import { History } from './History';
import styled from 'styled-components'

const Button = styled.button`
    color: white;
    border-radius: 16px;
    width: 2rem;
    min-height: 2rem;
    border-width: 0pc;
    cursor: pointer;
`

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

    const clearSearch = (): void => {
        setArtist('');
        setText('')
    }

    return(
        <>
            <div className="search-bar">
                {artist && 
                    <Button className="back-button" type="submit" onClick={() => clearSearch()}>
                        <img src="https://e7.pngegg.com/pngimages/744/634/png-clipart-arrow-computer-icons-arrow-angle-arrow-thumbnail.png" width="15" heigth="15"/> 
                    </Button>
                }
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search.."
                    value={text}
                    onChange={(e) => {setText(e.target.value)}}
                />
                <Button className="search-button" type="submit" onClick={() => {text && makeSearch()}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg" width="15" heigth="15"/> 
                </Button>
            </div>
            { !artist ?
                <div className="history">
                    <History history={history} selectElementFromHistory={selectElementFromHistory}/>
                </div>
                :

                results.length > 0 ? 
                    <>
                        <div className='results'>
                            {results.map((release, index) => (
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
                : <div className="not-found"> No releases found for '{text}'</div>
            }
        </>

    );
}


