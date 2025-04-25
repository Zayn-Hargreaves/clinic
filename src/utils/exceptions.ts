export class BaseException extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestException extends BaseException {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}

export class NotFoundException extends BaseException {
    constructor(message: string = 'Resource Not Found') {
        super(message, 404);
    }
}

export class UnauthorizedException extends BaseException {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

export class ForbiddenException extends BaseException {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

export class InternalServerException extends BaseException {
    constructor(message: string = 'Internal Server Error') {
        super(message, 500);
    }
}