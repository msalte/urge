export default {
    getUsersApi: () => {
        return window.serviceEndpoints["users"];
    },
    getBlogApi: () => {
        return window.serviceEndpoints["blog"];
    },
    getSpaApi: () => {
        return window.serviceEndpoints["spa"];
    },
    getArduinoApi: () => {
        return window.serviceEndpoints["arduino"];
    },
};
