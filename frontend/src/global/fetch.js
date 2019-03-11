import isomorphicFetch from "isomorphic-fetch";
import serviceDiscovery from "./serviceDiscovery";
import { getJwtToken, getRefreshToken, setAuthTokens } from "./localStorage";

const HEADER_TOKEN_EXPIRED = "token-expired";

const defaultOptions = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
};

const addBearerToken = options => {
    options.headers.Authorization = `Bearer ${getJwtToken()}`;
    return options;
};

const refresh = (jwt, refreshToken) => {
    const url = serviceDiscovery.getUsersApi() + "/auth/refreshToken";

    return isomorphicFetch(
        url,
        Object.assign(
            {
                method: "POST",
                body: JSON.stringify({ token: jwt, refreshToken }),
            },
            defaultOptions
        )
    );
};

export const fetch = (url, options = {}, auth = false) => {
    let opts = Object.assign({}, defaultOptions, options);

    if (auth === true) {
        opts = addBearerToken(opts);
    }

    return isomorphicFetch(url, opts).then(response => {
        if (response.ok) {
            return response.json();
        } else if (
            response.status === 401 &&
            response.headers.has(HEADER_TOKEN_EXPIRED) &&
            auth === true
        ) {
            return refresh(getJwtToken(), getRefreshToken())
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    const { token, refreshToken } = json;

                    setAuthTokens(token, refreshToken);

                    return fetch(url, options, auth);
                });
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    });
};

const method = m => (url, data, options, auth = false) => {
    const opts = { method: m, body: JSON.stringify(data) };

    return fetch(url, Object.assign(opts, options), auth);
};

export const post = method("POST");
