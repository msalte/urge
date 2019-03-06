import React, { useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import classNames from "classnames";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const container = document.getElementById("overlays");

export default ({ title, isOpen, onClose, children }) => {
    const ref = useRef(null);

    if (isOpen) {
        document.body.classList.add("modalOpen");
    }

    const handleClose = () => {
        document.body.classList.remove("modalOpen");
        onClose();
    };

    const handleClickOutside = (ref, e) => {
        if (e.target.contains(ref.current)) {
            handleClose();
        }
    };

    return createPortal(
        <div
            className={classNames(styles.modal, {
                [styles.open]: isOpen,
            })}
            onMouseDown={e => handleClickOutside(ref, e)}
        >
            <div
                ref={ref}
                className={classNames(styles.content, {
                    [styles.open]: isOpen,
                })}
            >
                <div className={styles.headerRow}>
                    <div>{title}</div>
                    <div className={styles.button}>
                        <Button onClick={() => handleClose()} stretch>
                            <FontAwesomeIcon icon="times" />
                        </Button>
                    </div>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>,
        container
    );
};
