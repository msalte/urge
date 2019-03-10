import React, { useRef, useState } from "react";
import styles from "./styles.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ icon, placeholder, type, onValueChanged }) => {
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(false);

    return (
        <div className={styles.inputContainer}>
            <div
                className={classNames(styles.control, {
                    [styles.focused]: focused,
                })}
            >
                {icon && (
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                )}
                <input
                    onChange={e =>
                        onValueChanged && onValueChanged(e.target.value)
                    }
                    placeholder={placeholder ? placeholder : null}
                    type={type ? type : "text"}
                    ref={inputRef}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </div>
        </div>
    );
};
