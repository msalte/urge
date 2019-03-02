import React from "react";
import styles from "./styles.scss";
import {
    SideBarItems,
    ensureSideBarItemActive,
} from "../../../NavigationContext";

export default () => {
    ensureSideBarItemActive(SideBarItems.user);

    return <div className={styles.container}>Coming soon...</div>;
};
