import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const appointmentController = new AppointmentController();

router.post('/', asyncHandler(appointmentController.createAppointment));
router.get('/', asyncHandler(appointmentController.getAppointments));
router.get('/:id', asyncHandler(appointmentController.getAppointmentById));
router.put('/:id', asyncHandler(appointmentController.updateAppointment));
router.delete('/:id', asyncHandler(appointmentController.deleteAppointment));

export default router;