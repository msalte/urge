import React from "react";
import styles from "./styles.scss";
import classNames from "classnames";

export default props => {
    const { onClick, stretch } = props;

    const className = classNames(styles.button, {
        [styles.stretch]: stretch,
    });

    return (
        <button className={className} onClick={() => onClick()}>
            {props.children}
        </button>
    );
};
