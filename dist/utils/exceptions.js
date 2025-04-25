"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = exports.ForbiddenException = exports.UnauthorizedException = exports.NotFoundException = exports.BadRequestException = exports.BaseException = void 0;
class BaseException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseException = BaseException;
class BadRequestException extends BaseException {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}
exports.BadRequestException = BadRequestException;
class NotFoundException extends BaseException {
    constructor(message = 'Resource Not Found') {
        super(message, 404);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends BaseException {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends BaseException {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}
exports.ForbiddenException = ForbiddenException;
class InternalServerException extends BaseException {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
    }
}
exports.InternalServerException = InternalServerException;
