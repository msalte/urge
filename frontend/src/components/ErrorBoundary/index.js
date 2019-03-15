import React, { Component } from "react";

export default class ErroBoundary extends Component {
    state = {
        hasError: false,
        error: null,
        info: null,
    };

    componentDidCatch(error, info) {
        this.setState({ hasError: true, error, info });
    }

    render() {
        const { hasError, error, info } = this.state;

        if (hasError) {
            return <ErrorMessage error={error} info={info} />;
        }

        return this.props.children;
    }
}
