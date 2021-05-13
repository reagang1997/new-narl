import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

const NewsFeed = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        const tmpNews = await axios.get('/api/news');
        setNews(tmpNews.data);
    }

    return (
        <div>
            <Card body className='box' style={{ width: 'fit-content', marginTop: '50px' }}>
                <h1 style={{width: 'fit-content', margin: 'auto', borderBottom: '2px solid rgb(255, 230, 0)', marginBottom: '25px'}}>News Feed</h1>
                {news.length > 2 ? <div>{news.map(post => {
                    return (
                        <Card body>
                            {post.message}
                        </Card>
                    )
                })}</div> : 
                <div><h4  style={{width: 'fit-content', margin: 'auto'}}>No News</h4></div>}
            </Card>
        </div>
    )

}

export default NewsFeed;