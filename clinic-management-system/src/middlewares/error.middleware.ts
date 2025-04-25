import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
    status?: number;
}

export const errorMiddleware = (
    err: ErrorWithStatus,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err.stack); // Ghi log lỗi để debug

    const status = err.status || 500; // Mã trạng thái, mặc định 500 nếu không có
    const message = err.message || 'Internal Server Error'; // Thông báo lỗi

    res.status(status).json({
        statusCode: status,
        message,
    });
};