import React, { useState, useEffect } from "react";
import styles from "../styles.scss";
import { fetch } from "../../../global/fetch";
import serviceDiscovery from "../../../global/serviceDiscovery";
import Spinner from "../../Spinner";

export default () => {
    const [articles, setArticles] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFetching(true);
        fetch(serviceDiscovery.getBlogApi() + "/articles")
            .then(articles => {
                setArticles(articles);
                setFetching(false);
            })
            .catch(error => {
                setError(error);
                setFetching(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            {isFetching && <Spinner text="Loading articles..." />}
            {!isFetching && error && error}
            {articles.map((article, index) => {
                return (
                    <ul key={index}>
                        <li>{article.title}</li>
                        <li>{article.content}</li>
                        <li>{article.author}</li>
                        <li>{article.id}</li>
                    </ul>
                );
            })}
        </div>
    );
};
