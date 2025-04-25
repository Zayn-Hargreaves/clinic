import { Appointment } from '../../models/appointment.model';

export interface ScheduleObserver {
    update(appointment: Appointment): void;
}

export class EmailNotificationObserver implements ScheduleObserver {
    update(appointment: Appointment): void {
        console.log(`Email sent to patient ${appointment.doctorId} for appointment on ${appointment.appointmentDate}`);
        // Gửi email thực tế
    }
}

export class ScheduleSubject {
    private observers: ScheduleObserver[] = [];

    addObserver(observer: ScheduleObserver) {
        this.observers.push(observer);
    }

    notifyObservers(appointment: Appointment) {
        this.observers.forEach((observer) => observer.update(appointment));
    }
}