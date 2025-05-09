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
exports.AppointmentService = void 0;
const appointment_repository_1 = require("../repositories/appointment.repository");
const patient_repository_1 = require("../repositories/patient.repository");
const doctor_repository_1 = require("../repositories/doctor.repository");
const exceptions_1 = require("../utils/exceptions");
const AppointmentBuilder_1 = require("../patterns/builder/AppointmentBuilder");
class AppointmentService {
    constructor() {
        this.appointmentRepository = new appointment_repository_1.AppointmentRepository();
        this.patientRepository = new patient_repository_1.PatientRepository();
        this.doctorRepository = new doctor_repository_1.DoctorRepository();
    }
    checkAvailability(doctorId, appointmentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const conflictingAppointment = yield this.appointmentRepository.findByDoctorAndTime(doctorId, appointmentDate);
            return !conflictingAppointment;
        });
    }
    createAppointment(patientId, doctorId, appointmentDate, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.patientRepository.findById(patientId);
            if (!patient) {
                throw new exceptions_1.BadRequestException('Patient not found');
            }
            const doctor = yield this.doctorRepository.findById(doctorId);
            if (!doctor) {
                throw new exceptions_1.BadRequestException('Doctor not found');
            }
            const isAvailable = yield this.checkAvailability(doctorId, appointmentDate);
            if (!isAvailable) {
                throw new exceptions_1.BadRequestException('Time slot is not available');
            }
            const builder = new AppointmentBuilder_1.AppointmentBuilder()
                .setPatient(patient)
                .setDoctor(doctor)
                .setDate(appointmentDate);
            if (reason)
                builder.setReason(reason);
            const appointmentData = builder.build();
            return this.appointmentRepository.create(appointmentData);
        });
    }
    getAppointments(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository.findWithFilters(filters);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository.findById(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository.findAll();
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.appointmentDate && data.doctorId) {
                const isAvailable = yield this.checkAvailability(data.doctorId, data.appointmentDate);
                if (!isAvailable) {
                    throw new exceptions_1.BadRequestException('Time slot is not available');
                }
            }
            return this.appointmentRepository.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository.delete(id);
        });
    }
}
exports.AppointmentService = AppointmentService;
