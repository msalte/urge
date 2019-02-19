import React from "react";
import styles from "../styles.scss";
import { Phone, LargerThanPhone } from "../../Responsive";

export default () => {
    return (
        <div className={styles.container}>
            <Phone>YOu are viewing page on mobile.</Phone>
            <LargerThanPhone>
                You are viewing page on a PC or tablet.
            </LargerThanPhone>
        </div>
    );
};
