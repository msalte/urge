import React, { useState, useEffect } from "react";
import styles from "./styles.scss";
import { fetch } from "../../../global/fetch";
import serviceDiscovery from "../../../global/serviceDiscovery";
import Spinner from "../../Spinner";
import Article from "./Article";

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
            {articles.map(article => {
                return <Article key={article.id} article={article} />;
            })}
        </div>
    );
};
