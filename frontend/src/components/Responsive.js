import React from "react";
import MediaQuery from "react-responsive";
import "match-media";

const phoneMaxWidth = 767;
const tabletMaxWidth = 1224;

export const Phone = ({ children, ...props }) => {
    return (
        <MediaQuery maxWidth={phoneMaxWidth} {...props}>
            {children}
        </MediaQuery>
    );
};

export const PhoneLandscape = ({ children, ...props }) => {
    return (
        <MediaQuery
            maxWidth={phoneMaxWidth}
            orientation={"landscape"}
            {...props}
        >
            {children}
        </MediaQuery>
    );
};

export const PhonePortrait = ({ children, ...props }) => {
    return (
        <MediaQuery
            maxWidth={phoneMaxWidth}
            orientation={"portrait"}
            {...props}
        >
            {children}
        </MediaQuery>
    );
};

export const LargerThanPhone = ({ children, ...props }) => {
    return (
        <MediaQuery minWidth={phoneMaxWidth} {...props}>
            {children}
        </MediaQuery>
    );
};

export const Tablet = ({ children, ...props }) => {
    return (
        <MediaQuery maxWidth={tabletMaxWidth} {...props}>
            {children}
        </MediaQuery>
    );
};

export const TabletLandscape = ({ children, ...props }) => {
    return (
        <MediaQuery
            maxWidth={tabletMaxWidth}
            orientation={"landscape"}
            {...props}
        >
            {children}
        </MediaQuery>
    );
};

export const TabletPortrait = ({ children, ...props }) => {
    return (
        <MediaQuery
            maxWidth={tabletMaxWidth}
            orientation={"portrait"}
            {...props}
        >
            {children}
        </MediaQuery>
    );
};

export const LargerThanTablet = ({ children, ...props }) => {
    return (
        <MediaQuery minWidth={tabletMaxWidth} {...props}>
            {children}
        </MediaQuery>
    );
};

export const Desktop = ({ children, ...props }) => {
    return (
        <MediaQuery minWidth={tabletMaxWidth} {...props}>
            {children}
        </MediaQuery>
    );
};

export const isPhone = () =>
    matchMedia(`only screen and (max-width: ${phoneMaxWidth}px)`).matches;
export const isTablet = () =>
    matchMedia(`only screen and (max-width: ${tabletMaxWidth}px)`).matches;
