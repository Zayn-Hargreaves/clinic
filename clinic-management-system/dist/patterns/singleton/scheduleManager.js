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
exports.ScheduleManager = void 0;
const appointment_service_1 = require("../../services/appointment.service");
const notification_service_1 = require("../../services/notification.service");
class ScheduleManager {
    constructor() {
        this.appointmentService = new appointment_service_1.AppointmentService();
        this.notificationService = new notification_service_1.NotificationService();
    }
    static getInstance() {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }
    getAppointmentService() {
        return this.appointmentService;
    }
    scheduleAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.appointmentService.createAppointment(data.patientId, data.doctorId, data.appointmentDate, data.reason);
            yield this.notificationService.notifyAppointmentCreated(appointment);
            return appointment;
        });
    }
}
exports.ScheduleManager = ScheduleManager;
