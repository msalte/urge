import React, { useRef, useState } from "react";
import Button from "components/Button";
import styles from "./styles.scss";

export default ({ placeholder, onChange }) => {
    const [files, setFiles] = useState(null);

    const buttonRef = useRef();

    const handleClick = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    };

    const handleChange = files => {
        setFiles(files);
        onChange && onChange(files);
    };

    return (
        <React.Fragment>
            <Button primary onClick={() => handleClick()}>
                <label style={{ pointerEvents: "none" }} ref={buttonRef} htmlFor="f">
                    <input
                        style={{ display: "none" }}
                        id="f"
                        placeholder={placeholder}
                        type="file"
                        multiple
                        onChange={e => handleChange(e.target.files)}
                    />
                    Browse...
                </label>
            </Button>
            <div className={styles.selectedFiles}>
                {files && Array.from(files).map(f => <div>{f.name}</div>)}
            </div>
        </React.Fragment>
    );
};
