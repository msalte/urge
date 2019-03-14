import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { UserContext } from "./UserContext";

const locations = {
    blog: {
        key: "blog",
        displayName: "Blog",
        icon: "book",
        link: "/",
    },
    arduino: {
        key: "arduino",
        displayName: "Arduino",
        icon: "chart-bar",
        link: "/arduino",
        subMenu: {
            isDefaultOpen: false,
            isParentSelectable: false,
            items: [],
        },
    },
    github: {
        key: "github",
        displayName: "GitHub",
        icon: "code-branch",
        isExternal: true,
        link: "https://github.com/msalte/urge",
    },
    user: {
        key: "user",
        displayName: "User",
        icon: "user",
        link: "/user",
        visibleInSideBar: false,
    },
};

const NavigationContext = React.createContext({
    locations: {},
    locationsUpdated: null,
    activeLocation: {},
    activeSubMenuItem: {},
    setActiveLocation: () => {},
});

const populateArduinoSubMenu = arduinoItems => {
    // TODO: fetch from server
    for (var i = 0; i < 3; i++) {
        const date = moment().subtract(i, "week");
        const dateStr = date.format("DD-MM-YYYY");

        arduinoItems.push({
            key: dateStr,
            displayName: dateStr,
            link: `/arduino/${dateStr}`,
            shortName: date.format("DDMM"),
        });
    }
};

const getUpdatedTimestamp = () => {
    return moment().toString();
};

export const NavigationContextStateProvider = ({ children }) => {
    const userContext = useContext(UserContext);
    const [activeLocation, setActiveLocation] = useState(null);
    const [activeSubMenuItem, setActiveSubMenuItem] = useState(null);
    const [locationsUpdated, setLocationsUpdated] = useState(null);

    useEffect(() => {
        const {
            arduino: { subMenu },
        } = locations;

        if (subMenu.items.length === 0) {
            populateArduinoSubMenu(subMenu.items);
        }
    }, []);

    useEffect(() => {
        const { isLoggedIn } = userContext;

        const {
            arduino: { subMenu },
        } = locations;

        const adminItem = {
            key: "admin",
            isAdmin: true,
            displayName: "Admin",
            link: "/arduino/admin",
            shortName: "ADM",
        };

        const itemIndex = subMenu.items.findIndex(i => i.key === adminItem.key);

        if (itemIndex === -1 && isLoggedIn) {
            subMenu.items.unshift(adminItem);
            setLocationsUpdated(getUpdatedTimestamp());
        } else if (itemIndex !== -1 && !isLoggedIn) {
            subMenu.items.splice(itemIndex, 1);
            setLocationsUpdated(getUpdatedTimestamp());
        }
    }, [userContext.isLoggedIn]);

    const handleActiveSubMenuItemChanged = item => {
        setActiveSubMenuItem(item);
    };

    const handleActiveLocationChanged = loc => {
        setActiveLocation(loc);

        if (loc.subMenu) {
            // the new location has a sub menu, check if active sub menu item is present

            const subMenuItem = loc.subMenu.items.find(
                i => i === activeSubMenuItem
            );

            if (!subMenuItem && activeSubMenuItem) {
                handleActiveSubMenuItemChanged(null);
            }
        } else {
            handleActiveSubMenuItemChanged(null);
        }
    };

    return (
        <NavigationContext.Provider
            value={{
                locations,
                locationsUpdated,
                activeLocation,
                activeSubMenuItem,
                setActiveLocation: loc => handleActiveLocationChanged(loc),
                setActiveSubMenuItem: item =>
                    handleActiveSubMenuItemChanged(item),
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;
