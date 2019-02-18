import React, { useReducer } from "react";
import Button from "../../Button";
import {
    SideBarItems,
    ensureSideBarItemActive,
} from "../../../NavigationContext";

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

export default () => {
    ensureSideBarItemActive(SideBarItems.profile);

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
