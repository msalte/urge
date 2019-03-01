import isomorphicFetch from "isomorphic-fetch";

const defaultOptions = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

const addBearerToken = options => {
    const token = "TODO: resolve";
    options.headers.Authorization = `Bearer ${token}`;
    return options;
};

export const fetch = (url, params = null, options = {}) => {
    if (params) {
        // TODO: handle
        console.log(params);
    }

    return isomorphicFetch(
        url,
        Object.assign(addBearerToken(defaultOptions), options)
    ).then(response => {
        return response.json();
    });
};

const method = m => (url, data, options) => {
    return fetch(
        url,
        null,
        Object.assign({ method: m, body: JSON.stringify(data) }, options)
    );
};

export const post = method("POST");
