import { useState } from "react";
import { isPhone } from "../Responsive";

export const useCollapseToggler = () => {
    // using strings for boolean values here because local storage
    // sometimes store booleans as strings.

    const defaultState = isPhone()
        ? "true"
        : localStorage.getItem("sidebar-collapsed") || "false";

    const [isCollapsed, setCollapsed] = useState(defaultState);
    const toggleCollapsed = () => {
        const newValue = isCollapsed === "true" ? "false" : "true";
        setCollapsed(newValue);
        localStorage.setItem("sidebar-collapsed", newValue);
    };

    return [isCollapsed === "true", toggleCollapsed];
};
