import React, { useState, useRef } from "react";
import styles from "./styles.scss";
import Spinner from "components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => {
    const { onQueryChanged } = props;
    const [isSpinning, setSpinning] = useState(false);
    const [query, setQuery] = useState("");
    const [delay, setDelay] = useState(null);

    const inputRef = useRef(null);

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

    const handleClear = () => {
        setQuery("");
        inputRef.current.focus();
    };

    return (
        <div className={styles.searchBar}>
            <FontAwesomeIcon icon="search" className={styles.icon} />
            <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder="Search..."
                onChange={e => handleOnChange(e.target.value)}
            />
            <div className={styles.clear}>
                {isSpinning && <Spinner />}
                {!isSpinning && query && (
                    <FontAwesomeIcon
                        icon="times"
                        onClick={() => handleClear()}
                    />
                )}
            </div>
        </div>
    );
};
