import React, { useState, useEffect } from "react";
import styles from "./styles.scss";
import { fetch } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";
import Spinner from "components/Spinner";
import Article from "./Article";
import NavigationContext, { Locations } from "components/NavigationContext";
import { UserContext } from "components/UserContext";

export default () => {
    const navContext = React.useContext(NavigationContext);
    const userContext = React.useContext(UserContext);

    const [articles, setArticles] = useState([]);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        navContext.setActiveLocation(Locations.blog);
    }, []);

    useEffect(() => {
        setFetching(true);
        fetch(serviceDiscovery.getBlogApi() + "/articles", true)
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
        <React.Fragment>
            {userContext.isLoggedIn && (
                <div className={styles.greeting}>
                    Welcome, {userContext.user.name}!
                </div>
            )}

            <div className={styles.blogContainer}>
                {isFetching && <Spinner floating text="Loading articles..." />}
                {!isFetching && error && error.toString()}
                {articles.map(article => {
                    return <Article key={article.id} article={article} />;
                })}
            </div>
        </React.Fragment>
    );
};
