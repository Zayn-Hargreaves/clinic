import { Repository } from 'typeorm';
import { Patient } from '../models/patient.model';
import { AppDataSource } from '../data-source';
import { NotFoundException } from '../utils/exceptions';

export class PatientRepository {
    private repository: Repository<Patient>;

    constructor() {
        this.repository = AppDataSource.getRepository(Patient);
    }

    async findById(id: number): Promise<Patient> {
        const patient = await this.repository.findOne({ where: { id } });
        if (!patient) {
            throw new NotFoundException('Patient not found');
        }
        return patient;
    }
}