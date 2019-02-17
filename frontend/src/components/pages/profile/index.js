import React, { useReducer, useContext } from "react";
import Button from "../../Button";
import NavigationContext, { SideBarItems } from "../../../NavigationContext";

const reducer = (profile, action) => {
    switch (action.type) {
        case "increase-age":
            return { ...profile, age: profile.age + 1 };
    }
};

const initialState = {
    name: "Morten",
    age: 32,
    address: "Kvellurveien 36",
};

const ensureSideBarItemActive = () => {
    const navigationContext = useContext(NavigationContext);

    if (navigationContext.activeSideBarKey !== SideBarItems.profile.key) {
        navigationContext.setActiveSideBarKey(SideBarItems.profile.key);
    }
};

export default () => {
    ensureSideBarItemActive();

    const [profile, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <div>{profile.name}</div>
            <div>{profile.age}</div>
            <Button onClick={() => dispatch({ type: "increase-age" })}>
                Increment age
            </Button>
        </div>
    );
};
