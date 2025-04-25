import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Patient } from '../../models/patient.model';
import { Doctor } from '../../models/doctor.model';
import { Appointment } from '../../models/appointment.model';
import { Supplier } from '../../models/supplier.model';
import { Medicine } from '../../models/medicine.model';
import { MedicalSupply } from '../../models/medicalSupply.model';
import { ImportVoucher } from '../../models/importVoucher.model';
import { ImportDetail } from '../../models/importDetail.model';
dotenv.config();

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private dataSource: DataSource;

    private constructor() {
        this.dataSource = new DataSource({
            type: 'mysql',
            url: process.env.DATABASE_URL,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            migrations: ['src/migrations/*.ts'],
            synchronize: false,
            logging: true,
        });
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            console.log(DatabaseConnection.instance)
        }
        return DatabaseConnection.instance;
    }

    public async initialize(): Promise<void> {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
            console.log('Database connected');
        }
    }

    public getDataSource(): DataSource {
        return this.dataSource;
    }
}