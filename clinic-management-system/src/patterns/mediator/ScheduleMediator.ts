import { AppointmentService } from '../../services/appointment.service';
import { PatientRepository } from '../../repositories/patient.repository';
import { DoctorRepository } from '../../repositories/doctor.repository';

export class ScheduleMediator {
    constructor(
        private appointmentService: AppointmentService,
        private patientRepository: PatientRepository,
        private doctorRepository: DoctorRepository
    ) { }

    async createAppointment(patientId: number, doctorId: number, appointmentDate: Date, reason?: string) {
        const patient = await this.patientRepository.findById(patientId);
        const doctor = await this.doctorRepository.findById(doctorId);
        await this.appointmentService.createAppointment(patientId, doctorId, appointmentDate, reason);
        console.log(`Appointment created for ${patient.name} with ${doctor.name}`);
    }
}