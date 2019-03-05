import React from "react";
import styles from "./styles.scss";
import Card from "../../../Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ article }) => {
    const footer = (
        <div className={styles.articleFooter}>
            <FontAwesomeIcon icon="long-arrow-alt-right" />
        </div>
    );

    return (
        <div className={styles.articleContainer}>
            <Card
                title={article.title}
                body={article.content}
                footer={footer}
                enableHover
            />
        </div>
    );
};
