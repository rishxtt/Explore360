class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // Adds a "meesage" property
        this.code = errorCode; // Adds a "code" property

    }
}

module.exports = HttpError;