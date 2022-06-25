import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/home'
import { About } from './components/about'
import "./index.css";

ReactDOM.render(
    <Router>
      <div className="container">
        <Routes>
            <Route path="/music-library" element={<Home/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>,
    document.getElementById('app-root'),
)
