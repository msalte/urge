import React from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import classNames from "classnames";
import styles from "./styles.scss";

const container = document.getElementById("overlays");

export default ({ isOpen, onClose, children }) => {
    return createPortal(
        <div className={classNames(styles.modal, { [styles.open]: isOpen })}>
            {children}
            <Button onClick={() => onClose()}>Close</Button>
        </div>,
        container
    );
};
