export class NotImplementedError extends Error {
    constructor(message: string) {
        super(message);

        this.message = message;
        this.name = 'NotImplementedError';
    }
}

export class HttpError extends Error {
    constructor(message: string, public status: number) {
        super(message);

        this.message = message;
        this.status = status;
        this.name = 'HttpError';
    }
}
