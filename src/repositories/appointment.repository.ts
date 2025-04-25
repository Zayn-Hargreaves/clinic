import { Repository, Between } from 'typeorm';
import { Appointment } from '../models/appointment.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';

export class AppointmentRepository {
    private repository: Repository<Appointment>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Appointment);
    }

    async findAll(): Promise<Appointment[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Appointment> {
        const appointment = await this.repository.findOne({ where: { id } });
        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }
        return appointment;
    }

    async findByDoctorAndTime(doctorId: number, appointmentDate: Date): Promise<Appointment | null> {
        return this.repository.findOne({ where: { doctorId, appointmentDate } });
    }

    async findWithFilters(filters: {
        doctorId?: number;
        patientId?: number;
        startDate?: Date;
        endDate?: Date;
        page: number;
        limit: number;
    }): Promise<{ appointments: Appointment[]; total: number }> {
        const { doctorId, patientId, startDate, endDate, page, limit } = filters;
        const query = this.repository.createQueryBuilder('appointment');

        if (doctorId) {
            query.andWhere('appointment.doctorId = :doctorId', { doctorId });
        }
        if (patientId) {
            query.andWhere('appointment.patientId = :patientId', { patientId });
        }
        if (startDate && endDate) {
            query.andWhere('appointment.appointmentDate BETWEEN :startDate AND :endDate', { startDate, endDate });
        }

        const skip = (page - 1) * limit;
        query.skip(skip).take(limit);

        const [appointments, total] = await query.getManyAndCount();
        return { appointments, total };
    }

    async create(data: { patientId: number; doctorId: number; appointmentDate: Date; reason?: string }): Promise<Appointment> {
        const appointment = this.repository.create(data);
        return this.repository.save(appointment);
    }

    async update(id: number, data: Partial<{ patientId: number; doctorId: number; appointmentDate: Date; reason?: string }>): Promise<Appointment> {
        const appointment = await this.findById(id);
        Object.assign(appointment, data);
        return this.repository.save(appointment);
    }

    async delete(id: number): Promise<void> {
        const appointment = await this.findById(id);
        await this.repository.remove(appointment);
    }
}