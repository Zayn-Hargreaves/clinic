import { Repository } from 'typeorm';
import { Patient } from '../models/patient.model';
import { NotFoundException } from '../utils/exceptions';
import { DatabaseConnection } from '../patterns/singleton/database';

export class PatientRepository {
    private repository: Repository<Patient>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Patient);
    }

    async findById(id: number): Promise<Patient> {
        const patient = await this.repository.findOne({ where: { id } });
        if (!patient) {
            throw new NotFoundException('Patient not found');
        }
        return patient;
    }
}