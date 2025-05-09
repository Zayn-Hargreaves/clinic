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
exports.ScheduleMediator = void 0;
class ScheduleMediator {
    constructor(appointmentService, patientRepository, doctorRepository) {
        this.appointmentService = appointmentService;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }
    createAppointment(patientId, doctorId, appointmentDate, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.patientRepository.findById(patientId);
            const doctor = yield this.doctorRepository.findById(doctorId);
            yield this.appointmentService.createAppointment(patientId, doctorId, appointmentDate, reason);
            console.log(`Appointment created for ${patient.name} with ${doctor.name}`);
        });
    }
}
exports.ScheduleMediator = ScheduleMediator;
