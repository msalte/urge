import isomorphicFetch from "isomorphic-fetch";
// import serviceDiscovery from "./serviceDiscovery";
import { getJwtToken } from "./localStorage";

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

// const refresh = (jwt, refreshToken) => {
//     const url = serviceDiscovery.getUsersApi() + "/auth/refreshToken";

//     const options = Object.assign(
//         {
//             method: "POST",
//             body: JSON.stringify({ token: jwt, refreshToken }),
//         },
//         defaultOptions
//     );

//     return isomorphicFetch(url, options);
// };

export const fetch = (url, auth = false, addOptions = {}) => {
    let options = Object.assign({}, defaultOptions, addOptions);

    if (auth === true) {
        options = addBearerToken(options);
    }

    return isomorphicFetch(url, options).then(response => {
        if (response.ok) {
            return response.json();
        } else if (
            response.status === 401 &&
            response.headers.has(HEADER_TOKEN_EXPIRED) &&
            auth === true
        ) {
            // return refresh(getJwtToken(), getRefreshToken())
            //     .then(response => {
            //         return response.json();
            //     })
            //     .then(json => {
            //         const { token, refreshToken } = json;
            //         setAuthTokens(token, refreshToken);
            //         return fetch(url, auth, addOptions);
            //     });
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    });
};

const method = m => (url, data, auth = false) => {
    const options = { method: m, body: JSON.stringify(data) };

    return fetch(url, auth, options);
};

export const post = method("POST");
