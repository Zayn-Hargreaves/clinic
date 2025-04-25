export class NotificationService {
    async notifyAppointmentCreated(appointment: any): Promise<void> {
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
    }
}