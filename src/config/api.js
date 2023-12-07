const Host = process.env.API_BASE_URL;

const api = {
    form: `${Host}/create`,
    verifyNumber: (verifyNumber) => `${Host}/verify?number=${verifyNumber}`,
}

export default api;
