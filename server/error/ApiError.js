class ApiError extends Error{
    // Конструктор параметрами буде приймати статус код та повідомлення, яке буде повертатися на клієнт.
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    // Статичні функції
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError