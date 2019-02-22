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
            <Modal
                title="Dette er en tittel som er så lang at den brekker på mobil."
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vitae elementum ante. Aliquam ut pharetra dolor. Phasellus
                ornare quis metus ut venenatis. Phasellus pretium tempor elit
                eget consectetur. Mauris sit amet viverra nisl. Nulla posuere
                suscipit augue nec hendrerit. Mauris tincidunt tincidunt magna
                in elementum. Praesent ac lacus malesuada, lacinia libero id,
                accumsan ipsum. Suspendisse id dui ut enim accumsan sodales id
                sit amet mauris. Aenean nisl urna, lacinia at sollicitudin a,
                viverra dictum augue. Proin ex massa, malesuada ac tristique id,
                convallis nec enim. Nulla euismod ac leo quis viverra.
                Suspendisse venenatis nibh turpis, in porta ex dictum sit amet.
                Sed porttitor, arcu vel tincidunt vestibulum, erat leo venenatis
                quam, sit amet interdum dolor ex id felis. Duis aliquam purus et
                faucibus scelerisque. Phasellus sed arcu sed neque pretium
                accumsan id at nisi. Aliquam ac vulputate ligula. Aenean eget
                vestibulum nibh, id porttitor massa. Proin facilisis turpis
                interdum, gravida purus vitae, consequat eros. Vivamus congue
                lacus id sem hendrerit, non faucibus est luctus. Mauris et ipsum
                ipsum. Nullam et pulvinar urna. Curabitur ac mollis turpis. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Curabitur non vestibulum ante. In hac
                habitasse platea dictumst. Curabitur ullamcorper augue sed
                suscipit posuere. Morbi cursus felis in augue efficitur, sit
                amet porttitor tellus pulvinar. Phasellus sed rutrum nisl.
                Quisque erat arcu, pharetra et tellus sed, pretium convallis
                sapien. Proin scelerisque augue tempor erat dapibus viverra.
                Donec in ultricies justo. Maecenas vel odio tristique, fermentum
                turpis at, sagittis eros. Sed eget neque lacus. Vivamus cursus
                commodo sapien et mattis. Praesent in ligula quam. Praesent
                lobortis lectus quis ipsum lacinia tempor. Vivamus leo sapien,
                commodo eu justo id, maximus vehicula justo. Sed interdum, enim
                vel efficitur fermentum, diam arcu rutrum ex, nec vulputate est
                eros non neque. In cursus euismod posuere. Cras posuere, purus
                vitae commodo convallis, lectus lacus luctus dolor, quis
                sagittis arcu turpis vel eros. Ut non nisl non lectus sagittis
                ultrices eget in dui. Integer et odio at augue faucibus
                hendrerit. Vestibulum interdum, nunc rhoncus dictum
                sollicitudin, libero nisl porttitor purus, at vestibulum orci
                risus vel mi. Donec sit amet sem sit amet tellus vestibulum
                auctor a quis tortor. In sit amet dapibus mi. Nullam interdum
                tempus sem eu interdum. Cras ut elementum felis. Praesent a
                libero vel ex condimentum posuere ut nec est. Donec ut rutrum
                quam. Fusce justo mauris, auctor non ipsum nec, porttitor tempus
                lectus. Aenean libero nisi, cursus eu efficitur quis, lobortis
                ac massa. Donec gravida risus vel libero tempor dignissim. Morbi
                et quam ipsum. Praesent ac purus velit.
            </Modal>
        </div>
    );
};
