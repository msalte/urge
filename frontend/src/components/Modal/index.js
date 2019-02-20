import { createPortal, useEffect } from "react";

const container = document.getElementById("overlays");

export default props => {
    const modal = document.createElement("div");

    useEffect(() => {
        container.appendChild(modal);

        return () => {
            container.removeChild(modal);
        };
    }, []);

    return createPortal(props.children, modal);
};
