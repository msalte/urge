import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import ThemeContext, { themes } from "components/ThemeContext";

let timeout = null;

export default ({ onClick, primary, disabled, iconButton, children }) => {
    const [isMouseDown, setMouseDown] = useState(false);
    const [mouseHasBeenDown, setMouseHasBeenDown] = useState(false);

    const themeContext = useContext(ThemeContext);

    const className = classNames(styles.button, {
        [styles.primary]: primary,
        [styles.disabled]: disabled,
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
            disabled={disabled}
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
