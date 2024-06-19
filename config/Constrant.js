const STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
    INVALID_INPUT: 'Invalid input. Please check your input data.',
    SERVER_ERROR: 'Internal server error. Please try again later.',
    NOT_FOUND: 'The requested resource is not found.',
    BOOKING_ERROR: 'There was an error processing your booking.',
};

const SUCCESS_MESSAGES = {
    USER_CREATED: 'User has been created successfully.',
    BOOKING_CONFIRMED: 'Your booking has been confirmed.',
    PAYMENT_SUCCESSFUL: 'Payment was successful.',
};

module.exports = {
    STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES
};

