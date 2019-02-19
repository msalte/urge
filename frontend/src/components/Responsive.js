import MediaQuery from "react-responsive";

const phoneMaxWidth = 767;

export const Phone = ({ children, ...props }) => {
    return (
        <MediaQuery maxWidth={phoneMaxWidth} {...props}>
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
