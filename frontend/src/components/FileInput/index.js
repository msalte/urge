import React from "react";

export default ({ placeholder, onChange }) => {
    return (
        <input
            placeholder={placeholder}
            type="file"
            multiple
            onChange={e => onChange(e.target.files)}
        />
    );
};
