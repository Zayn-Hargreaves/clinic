import { Router } from 'express';
import supplierRoutes from './supplier.route';
import statisticsRoutes from './statistics.route';
import appointmentRoutes from "./appointment.route"
const router = Router();

router.use('/suppliers', supplierRoutes);
router.use('/reports', statisticsRoutes);
router.use('/appointment',appointmentRoutes)

export default router;