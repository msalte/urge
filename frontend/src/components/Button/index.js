import React, { useContext } from "react";
import ThemeContext from "../../ThemeContext";
import styles from "./styles.scss";
import classNames from "classnames";

export default props => {
    const { onClick, text } = props;
    const themeContext = useContext(ThemeContext);

    const className = classNames(styles.button, {
        [styles.dark]: themeContext.theme === "dark",
    });

    return (
        <button className={className} onClick={() => onClick()}>
            {text}
        </button>
    );
};
