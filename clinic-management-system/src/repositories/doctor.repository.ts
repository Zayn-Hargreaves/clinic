import { Repository } from 'typeorm';
import { Doctor } from '../models/doctor.model';
import { AppDataSource } from '../data-source';
import { NotFoundException } from '../utils/exceptions';

export class DoctorRepository {
  private repository: Repository<Doctor>;

  constructor() {
    this.repository = AppDataSource.getRepository(Doctor);
  }

  async findById(id: number): Promise<Doctor> {
    const doctor = await this.repository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }
}