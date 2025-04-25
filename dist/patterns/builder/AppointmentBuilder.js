"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBuilder = void 0;
const appointment_model_1 = require("../../models/appointment.model");
class AppointmentBuilder {
    constructor() {
        this.appointment = new appointment_model_1.Appointment();
    }
    setPatient(patient) {
        this.appointment.patientId = patient.id;
        return this;
    }
    setDoctor(doctor) {
        this.appointment.doctorId = doctor.id;
        return this;
    }
    setDate(appointmentDate) {
        this.appointment.appointmentDate = appointmentDate;
        return this;
    }
    setReason(reason) {
        this.appointment.reason = reason;
        return this;
    }
    build() {
        return this.appointment;
    }
}
exports.AppointmentBuilder = AppointmentBuilder;
