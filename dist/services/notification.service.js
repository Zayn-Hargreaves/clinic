"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
class NotificationService {
    notifyAppointmentCreated(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            // Giả định: Gửi email hoặc SMS
            console.log(`Notification sent for appointment ID ${appointment.id}`);
            // Ví dụ: Tích hợp nodemailer
            /*
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: 'your_email@gmail.com', pass: 'your_password' },
            });
            await transporter.sendMail({
                from: 'your_email@gmail.com',
                to: 'patient@clinic.com',
                subject: 'Appointment Confirmation',
                text: `Your appointment is scheduled at ${appointment.timeSlot}`,
            });
            */
        });
    }
}
exports.NotificationService = NotificationService;
