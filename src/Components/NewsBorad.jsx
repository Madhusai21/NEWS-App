import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NewsBorad = () => {
    const [search, setSearch] = useState('Latest');
    const [newData, setNewData] = useState([]);
    const [error, setError] = useState(null);

    const searchNews = async () => {
        const apikey = '677111527eb728eaec1f8430d48a68ae';
        const url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=us&max=10&apikey=${apikey}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            const articles = data.articles || []; // Ensure articles is an array
            setNewData(articles);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        searchNews();
    }, []);

    return (
        <>
            <nav className="navbar navbar-light" style={{ backgroundColor: "blue" }}>
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand text-white fw-bold" style={{ fontSize: "2.5rem" }}>NEWS APP</a>
                    <form className="d-flex mx-auto" style={{ width: "50%" }} onSubmit={(e) => { e.preventDefault(); searchNews(); }}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-dark text-white" type="submit">Search</button>
                    </form>
                    <span className="navbar-text text-white fw-bold" style={{ fontSize: "1.5rem" }}>INDIA</span>
                </div>
            </nav>
            <div className="input-news">
                <h2><span>{search}</span> News</h2>
            </div>
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div>
                    {newData.length > 0 ? (
                        newData.map((article, index) => (
                            <div className="box" key={index}>
                                <div className="img_box">
                                    <img src={article.image} alt='' />
                                </div>
                                <div className="content">
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                    <Link to={{ pathname: article.url }} target="_blank">Read More</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No news available</div>
                    )}
                </div>
            )}
        </>
    );
};

export default NewsBorad;
