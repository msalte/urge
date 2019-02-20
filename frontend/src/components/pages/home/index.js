import React, { useState } from "react";
import styles from "../styles.scss";
import { Phone, LargerThanPhone } from "../../Responsive";
import Modal from "../../Modal";
import Button from "../../Button";

export default props => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            <Phone>YOu are viewing page on mobile.</Phone>
            <LargerThanPhone>
                You are viewing page on a PC or tablet.
            </LargerThanPhone>

            <Button onClick={() => setModalOpen(true)}>
                Click to open modal
            </Button>

            {isModalOpen && (
                <Modal {...props}>
                    <div>
                        Bla bla ukeblad
                        <Button onClick={() => setModalOpen(false)}>
                            Close
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};
