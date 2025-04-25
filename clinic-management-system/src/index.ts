import express from 'express';
import * as dotenv from 'dotenv';
import appointmentRouter from './routes/appointment.route';
import supplierRouter from './routes/supplier.route';
import statisticsRouter from './routes/statistics.route';
import { DatabaseConnection } from './patterns/singleton/database';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/appointments', appointmentRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/statistics', statisticsRouter);

const PORT = process.env.PORT || 3000;

async function startServer() {
    await DatabaseConnection.getInstance().initialize();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer().catch((err) => {
    console.error('Failed to start server:', err);
});