import { AppointmentService } from '../../services/appointment.service';
import { NotificationService } from '../../services/notification.service';
import { Appointment } from '../../models/appointment.model';

export class ScheduleManager {
    private static instance: ScheduleManager;
    private appointmentService: AppointmentService;
    private notificationService: NotificationService;

    private constructor() {
        this.appointmentService = new AppointmentService();
        this.notificationService = new NotificationService();
    }

    public static getInstance(): ScheduleManager {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }

    public getAppointmentService(): AppointmentService {
        return this.appointmentService;
    }

    public async scheduleAppointment(data: {
        patientId: number;
        doctorId: number;
        appointmentDate: Date;
        reason?: string;
    }) {
        const appointment = await this.appointmentService.createAppointment(
            data.patientId,
            data.doctorId,
            data.appointmentDate,
            data.reason
        );
        await this.notificationService.notifyAppointmentCreated(appointment);
        return appointment;
    }
}