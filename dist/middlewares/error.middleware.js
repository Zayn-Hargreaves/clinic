"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.stack); // Ghi log lỗi để debug
    const status = err.status || 500; // Mã trạng thái, mặc định 500 nếu không có
    const message = err.message || 'Internal Server Error'; // Thông báo lỗi
    res.status(status).json({
        statusCode: status,
        message,
    });
};
exports.errorMiddleware = errorMiddleware;
