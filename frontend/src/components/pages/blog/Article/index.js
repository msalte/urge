import React from "react";
import styles from "./styles.scss";
export default ({ article }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.content}>{article.content}</div>
        </div>
    );
};
