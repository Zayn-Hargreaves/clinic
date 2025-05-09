"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSubject = exports.EmailNotificationObserver = void 0;
class EmailNotificationObserver {
    update(appointment) {
        console.log(`Email sent to patient ${appointment.doctorId} for appointment on ${appointment.appointmentDate}`);
        // Gửi email thực tế
    }
}
exports.EmailNotificationObserver = EmailNotificationObserver;
class ScheduleSubject {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    notifyObservers(appointment) {
        this.observers.forEach((observer) => observer.update(appointment));
    }
}
exports.ScheduleSubject = ScheduleSubject;
