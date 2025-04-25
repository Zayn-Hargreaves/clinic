import { AppointmentRepository } from '../repositories/appointment.repository';
import { PatientRepository } from '../repositories/patient.repository';
import { DoctorRepository } from '../repositories/doctor.repository';
import { BadRequestException } from '../utils/exceptions';
import { AppointmentBuilder } from '../patterns/builder/AppointmentBuilder';

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    private patientRepository: PatientRepository;
    private doctorRepository: DoctorRepository
    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.patientRepository = new PatientRepository()
        this.doctorRepository = new DoctorRepository()
    }

    async checkAvailability(doctorId: number, appointmentDate: Date): Promise<boolean> {
        const conflictingAppointment = await this.appointmentRepository.findByDoctorAndTime(
            doctorId,
            appointmentDate
        );
        return !conflictingAppointment;
    }

    async createAppointment(patientId: number, doctorId: number, appointmentDate: Date, reason?: string) {
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
            throw new BadRequestException('Patient not found');
        }
        const doctor = await this.doctorRepository.findById(doctorId);
        if (!doctor) {
            throw new BadRequestException('Doctor not found');
        }
        const isAvailable = await this.checkAvailability(doctorId, appointmentDate);
        if (!isAvailable) {
            throw new BadRequestException('Time slot is not available');
        }
        const builder = new AppointmentBuilder()
            .setPatient(patient)
            .setDoctor(doctor)
            .setDate(appointmentDate);
        if (reason) builder.setReason(reason);
        const appointmentData = builder.build();
        return this.appointmentRepository.create(appointmentData);
    }

    async getAppointments(filters: {
        doctorId?: number;
        patientId?: number;
        startDate?: Date;
        endDate?: Date;
        page: number;
        limit: number;
    }) {
        return this.appointmentRepository.findWithFilters(filters);
    }

    async findById(id: number) {
        return this.appointmentRepository.findById(id);
    }

    async findAll() {
        return this.appointmentRepository.findAll();
    }

    async update(id: number, data: Partial<{ patientId: number; doctorId: number; appointmentDate: Date; reason?: string }>) {
        if (data.appointmentDate && data.doctorId) {
            const isAvailable = await this.checkAvailability(data.doctorId, data.appointmentDate);
            if (!isAvailable) {
                throw new BadRequestException('Time slot is not available');
            }
        }
        return this.appointmentRepository.update(id, data);
    }

    async delete(id: number) {
        return this.appointmentRepository.delete(id);
    }
}