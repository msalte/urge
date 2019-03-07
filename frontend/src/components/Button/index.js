import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import ThemeContext, { themes } from "../../ThemeContext";

let timeout = null;

export default ({ onClick, stretch, primary, iconButton, children }) => {
    const [isMouseDown, setMouseDown] = useState(false);
    const [mouseHasBeenDown, setMouseHasBeenDown] = useState(false);

    const themeContext = useContext(ThemeContext);

    const className = classNames(styles.button, {
        [styles.stretch]: stretch,
        [styles.primary]: primary,
        [styles.isMouseDown]: isMouseDown,
        [styles.mouseHasBeenDown]: mouseHasBeenDown,
        [styles.iconButton]: iconButton,
        [styles.dark]: themeContext.theme === themes.dark,
    });

    useEffect(() => {
        // Ensure that animations does not fire when switching themes because
        // mouseHasBeenDown remains true.
        if (mouseHasBeenDown) {
            clearTimeout(timeout);
            timeout = setTimeout(() => setMouseHasBeenDown(false), 200);
        }
    }, [mouseHasBeenDown]);

    return (
        <button
            className={className}
            onClick={() => onClick && onClick()}
            onMouseDown={() => {
                setMouseDown(true);
                setMouseHasBeenDown(false);
            }}
            onMouseUp={() => {
                setMouseDown(false);
                setMouseHasBeenDown(true);
            }}
            onMouseOut={() => {
                if (isMouseDown) {
                    setMouseDown(false);
                }
            }}
        >
            {children}
        </button>
    );
};
