import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsBorad from './Components/NewsBorad';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NewsBorad />} />
            </Routes>
        </Router>
    );
}

export default App;
