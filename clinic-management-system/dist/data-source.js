"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: '12345',
    database: 'clinic_db',
    synchronize: false,
    logging: true,
    entities: ['src/entities/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
});
