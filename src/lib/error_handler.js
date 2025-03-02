export function processError(res_handler, error) {
    let status = 500;
    let message = 'An unknown error occured!';

    if (error && error.message)
        message = error.message;

    if (error && error.status)
        status = error.status;

    res_handler.status(status).send({ error: true, message: message });
}
