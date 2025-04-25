import { AppointmentService } from '../../services/appointment.service';

export interface AppointmentCommand {
    execute(): Promise<void>;
}

export class CreateAppointmentCommand implements AppointmentCommand {
    constructor(
        private service: AppointmentService,
        private patientId: number,
        private doctorId: number,
        private appointmentDate: Date,
        private reason?: string
    ) { }

    async execute(): Promise<void> {
        await this.service.createAppointment(this.patientId, this.doctorId, this.appointmentDate, this.reason);
    }
}

export class DeleteAppointmentCommand implements AppointmentCommand {
    constructor(private service: AppointmentService, private id: number) { }

    async execute(): Promise<void> {
        await this.service.delete(this.id);
    }
}