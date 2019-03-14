import { useContext, useEffect } from "react";
import NavigationContext from "components/NavigationContext";

export const useEnsureNavigationEffect = match => {
    const navContext = useContext(NavigationContext);

    const {
        path,
        params: { id },
    } = match;

    useEffect(() => {
        const {
            locations,
            activeLocation,
            activeSubMenuItem,
            locations: {
                arduino: {
                    subMenu: { items },
                },
            },
        } = navContext;

        if (locations.arduino !== activeLocation) {
            navContext.setActiveLocation(locations.arduino);
        }

        if (!activeSubMenuItem) {
            let subMenuItem = null;

            if (id) {
                subMenuItem = items.find(i => i.link.indexOf(id) !== -1);
            } else if (path && path.indexOf("admin")) {
                subMenuItem = items.find(i => i.isAdmin);
            }

            if (subMenuItem) {
                navContext.setActiveSubMenuItem(subMenuItem);
            }
        }
    }, [navContext]);
};
