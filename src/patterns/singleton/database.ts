import { DataSource } from 'typeorm';
import { AppDataSource } from '../../data-source';

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private dataSource: DataSource;

    private constructor() {
        this.dataSource = AppDataSource;
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