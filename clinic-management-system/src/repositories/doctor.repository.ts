import { Repository } from 'typeorm';
import { Doctor } from '../models/doctor.model';
import { NotFoundException } from '../utils/exceptions';
import { DatabaseConnection } from '../patterns/singleton/database';

export class DoctorRepository {
  private repository: Repository<Doctor>;

  constructor() {
    this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Doctor);
  }

  async findById(id: number): Promise<Doctor> {
    const doctor = await this.repository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }
}