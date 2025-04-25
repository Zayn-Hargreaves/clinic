"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const exceptions_1 = require("../utils/exceptions");
const asyncHandler_1 = require("../utils/asyncHandler");
const ScheduleMediator_1 = require("../patterns/mediator/ScheduleMediator");
const scheduleManager_1 = require("../patterns/singleton/scheduleManager");
const patient_repository_1 = require("../repositories/patient.repository");
const doctor_repository_1 = require("../repositories/doctor.repository");
const ScheduleObserver_1 = require("../patterns/observer/ScheduleObserver");
class AppointmentController {
    constructor() {
        this.createAppointment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { patientId, doctorId, appointmentDate, reason } = req.body;
                if (!patientId || !doctorId || !appointmentDate) {
                    throw new exceptions_1.BadRequestException('patientId, doctorId, and appointmentDate are required');
                }
                yield this.mediator.createAppointment(parseInt(patientId), parseInt(doctorId), new Date(appointmentDate), reason);
                return res.status(201).json({ success: true, message: 'Appointment created' });
            }
            catch (error) {
                next(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
        this.getAppointments = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { doctorId, patientId, startDate, endDate, page = '1', limit = '10' } = req.query;
            const result = yield this.appointmentService.getAppointments({
                doctorId: doctorId ? parseInt(doctorId) : undefined,
                patientId: patientId ? parseInt(patientId) : undefined,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                page: parseInt(page),
                limit: parseInt(limit),
            });
            return res.status(200).json({ success: true, data: result });
        }));
        this.getAppointmentById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new exceptions_1.BadRequestException('Invalid appointment ID');
            }
            const appointment = yield this.appointmentService.findById(idNum);
            return res.status(200).json({ success: true, data: appointment });
        }));
        this.updateAppointment = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new exceptions_1.BadRequestException('Invalid appointment ID');
            }
            const { patientId, doctorId, appointmentDate, reason } = req.body;
            const appointment = yield this.appointmentService.update(idNum, {
                patientId: patientId ? parseInt(patientId) : undefined,
                doctorId: doctorId ? parseInt(doctorId) : undefined,
                appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined,
                reason,
            });
            return res.status(200).json({ success: true, data: appointment });
        }));
        this.deleteAppointment = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new exceptions_1.BadRequestException('Invalid appointment ID');
            }
            yield this.appointmentService.delete(idNum);
            return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
        }));
        this.appointmentService = scheduleManager_1.ScheduleManager.getInstance().getAppointmentService();
        this.mediator = new ScheduleMediator_1.ScheduleMediator(this.appointmentService, new patient_repository_1.PatientRepository(), new doctor_repository_1.DoctorRepository());
        this.scheduleSubject = new ScheduleObserver_1.ScheduleSubject();
        this.scheduleSubject.addObserver(new ScheduleObserver_1.EmailNotificationObserver());
    }
}
exports.AppointmentController = AppointmentController;
