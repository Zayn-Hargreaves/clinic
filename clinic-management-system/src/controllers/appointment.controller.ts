import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';
import { BadRequestException } from '../utils/exceptions';
import { asyncHandler } from '../utils/asyncHandler';
import { CreateAppointmentCommand } from '../patterns/command/AppointmentCommand';
import { ScheduleMediator } from '../patterns/mediator/ScheduleMediator';
import { ScheduleManager } from '../patterns/singleton/scheduleManager';
import { PatientRepository } from '../repositories/patient.repository';
import { DoctorRepository } from '../repositories/doctor.repository';
import { ScheduleSubject, EmailNotificationObserver } from '../patterns/observer/ScheduleObserver';
export class AppointmentController {
    private readonly appointmentService: AppointmentService;
    private readonly mediator: ScheduleMediator;
    private readonly scheduleSubject:ScheduleSubject;
    constructor() {
        this.appointmentService = ScheduleManager.getInstance().getAppointmentService()
        this.mediator = new ScheduleMediator(this.appointmentService, new PatientRepository(), new DoctorRepository())
        this.scheduleSubject = new ScheduleSubject()
        this.scheduleSubject.addObserver(new EmailNotificationObserver())
    }

    createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { patientId, doctorId, appointmentDate, reason } = req.body;
            if (!patientId || !doctorId || !appointmentDate) {
                throw new BadRequestException('patientId, doctorId, and appointmentDate are required');
            }
            await this.mediator.createAppointment(
                parseInt(patientId),
                parseInt(doctorId),
                new Date(appointmentDate),
                reason
            )
            return res.status(201).json({ success: true, message: 'Appointment created' });
        } catch (error) {
            next(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    getAppointments = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { doctorId, patientId, startDate, endDate, page = '1', limit = '10' } = req.query;
        const result = await this.appointmentService.getAppointments({
            doctorId: doctorId ? parseInt(doctorId as string) : undefined,
            patientId: patientId ? parseInt(patientId as string) : undefined,
            startDate: startDate ? new Date(startDate as string) : undefined,
            endDate: endDate ? new Date(endDate as string) : undefined,
            page: parseInt(page as string),
            limit: parseInt(limit as string),
        });
        return res.status(200).json({ success: true, data: result });
    });

    getAppointmentById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.params;
        const idNum = parseInt(id);
        if (isNaN(idNum)) {
            throw new BadRequestException('Invalid appointment ID');
        }
        const appointment = await this.appointmentService.findById(idNum);
        return res.status(200).json({ success: true, data: appointment });
    });

    updateAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.params;
        const idNum = parseInt(id);
        if (isNaN(idNum)) {
            throw new BadRequestException('Invalid appointment ID');
        }
        const { patientId, doctorId, appointmentDate, reason } = req.body;
        const appointment = await this.appointmentService.update(idNum, {
            patientId: patientId ? parseInt(patientId) : undefined,
            doctorId: doctorId ? parseInt(doctorId) : undefined,
            appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined,
            reason,
        });
        return res.status(200).json({ success: true, data: appointment });
    });

    deleteAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { id } = req.params;
        const idNum = parseInt(id);
        if (isNaN(idNum)) {
            throw new BadRequestException('Invalid appointment ID');
        }
        await this.appointmentService.delete(idNum);
        return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    });
}