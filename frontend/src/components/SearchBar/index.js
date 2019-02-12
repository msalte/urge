import React, { useState } from "react";

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

    return (
        <div>
            <input
                type="search"
                value={query}
                placeholder="Type here to search..."
                onChange={e => handleOnChange(e.target.value)}
            />
            {isSpinning && "Searching..."}
        </div>
    );
};
