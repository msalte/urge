import React from "react";
import styles from "./styles.scss";
import Card from "../../../Card";
import Button from "../../../Button";

export default ({ article }) => {
    const footer = (
        <div className={styles.articleFooter}>
            <Button primary>Read more</Button>
        </div>
    );

    return (
        <div className={styles.articleContainer}>
            <Card
                title={article.title}
                body={article.content}
                footer={footer}
            />
        </div>
    );
};
