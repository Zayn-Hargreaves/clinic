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
exports.AppointmentRepository = void 0;
const appointment_model_1 = require("../models/appointment.model");
const database_1 = require("../patterns/singleton/database");
const exceptions_1 = require("../utils/exceptions");
class AppointmentRepository {
    constructor() {
        this.repository = database_1.DatabaseConnection.getInstance().getDataSource().getRepository(appointment_model_1.Appointment);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.repository.findOne({ where: { id } });
            if (!appointment) {
                throw new exceptions_1.NotFoundException('Appointment not found');
            }
            return appointment;
        });
    }
    findByDoctorAndTime(doctorId, appointmentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({ where: { doctorId, appointmentDate } });
        });
    }
    findWithFilters(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const { doctorId, patientId, startDate, endDate, page, limit } = filters;
            const query = this.repository.createQueryBuilder('appointment');
            if (doctorId) {
                query.andWhere('appointment.doctorId = :doctorId', { doctorId });
            }
            if (patientId) {
                query.andWhere('appointment.patientId = :patientId', { patientId });
            }
            if (startDate && endDate) {
                query.andWhere('appointment.appointmentDate BETWEEN :startDate AND :endDate', { startDate, endDate });
            }
            const skip = (page - 1) * limit;
            query.skip(skip).take(limit);
            const [appointments, total] = yield query.getManyAndCount();
            return { appointments, total };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = this.repository.create(data);
            return this.repository.save(appointment);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.findById(id);
            Object.assign(appointment, data);
            return this.repository.save(appointment);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.findById(id);
            yield this.repository.remove(appointment);
        });
    }
}
exports.AppointmentRepository = AppointmentRepository;
