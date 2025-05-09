import express from 'express';
import * as dotenv from 'dotenv';
import appointmentRouter from './routes/appointment.route';
import supplierRouter from './routes/supplier.route';
import statisticsRouter from './routes/statistics.route';
import importVoucherRouter from "./routes/importVourcher.route"
import medicalSupplyRouter from "./routes/medicalSupply.route"
import { DatabaseConnection } from './patterns/singleton/database';
import 'reflect-metadata'
import cors from "cors"
dotenv.config();




const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());



async function startServer() {
    await DatabaseConnection.getInstance().initialize();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
app.use('/api/suppliers', supplierRouter);
app.use('/api/statistics', statisticsRouter);
app.use("/api/import-vouchers",importVoucherRouter)
app.use("/api/medical",medicalSupplyRouter)
const PORT = process.env.PORT || 3000;
startServer().catch((err) => {
    console.error('Failed to start server:', err);
});