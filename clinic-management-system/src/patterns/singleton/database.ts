import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
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
            host: process.env.DB_HOST || 'mysql',  // hoặc 'localhost'
            port: 3306,
            username: 'admin',
            password: '12345',
            database: 'clinic_db',
            entities: [Supplier, Medicine, MedicalSupply, ImportVoucher, ImportDetail],
            synchronize: true,
            logging: true,
        });
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
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