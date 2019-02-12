import React, { useContext, useState } from "react";
import styles from "./styles.scss";
import SearchBar from "../../SearchBar";
import ThemeContext from "../../../ThemeContext";

export default () => {
    const [query, setQuery] = useState("");
    const context = useContext(ThemeContext);

    return (
        <div className={styles.container}>
            <button onClick={() => context.updateTheme("dark")}>
                Set theme dark
            </button>
            Home page
            <SearchBar onQueryChanged={query => setQuery(query)} />
            {query}
            {context.theme}
        </div>
    );
};
