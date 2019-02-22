import React, { useState } from "react";
import styles from "../styles.scss";
import Modal from "../../Modal";
import Button from "../../Button";
import { Phone, LargerThanPhone } from "../../Responsive";

export default () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div>
                <LargerThanPhone>
                    You are viewing this on a desktop or tablet.
                </LargerThanPhone>
                <Phone>You are viewing this on a mobile phone.</Phone>
            </div>

            <Button onClick={() => setModalOpen(true)}>
                Click to open modal
            </Button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                Dette er en tekst.
            </Modal>
        </div>
    );
};
