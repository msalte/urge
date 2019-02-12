import React, { useState } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import Spinner from "../Spinner";
import FontAwesome from "react-fontawesome";

export default props => {
    const { onQueryChanged } = props;
    const [isSpinning, setSpinning] = useState(false);
    const [query, setQuery] = useState("");
    const [delay, setDelay] = useState(null);

    const handleOnChange = query => {
        setSpinning(true);
        setQuery(query);
        clearTimeout(delay);
        setDelay(
            setTimeout(() => {
                onQueryChanged(query);
                setSpinning(false);
            }, 300)
        );
    };

    const className = classNames(styles.searchBar, {
        [styles.dark]: false,
    });

    return (
        <div className={className}>
            <input
                type="text"
                value={query}
                placeholder="Type here to search..."
                onChange={e => handleOnChange(e.target.value)}
            />
            {isSpinning && <Spinner />}
            {!isSpinning && query && (
                <FontAwesome
                    name="times"
                    className={styles.clear}
                    onClick={() => setQuery("")}
                />
            )}
        </div>
    );
};
