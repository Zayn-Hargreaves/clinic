import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';
import { Doctor } from '../../models/doctor.model';

export class AppointmentBuilder {
    private appointment: Appointment;

    constructor() {
        this.appointment = new Appointment();
    }

    setPatient(patient: Patient): this {
        this.appointment.patientId = patient.id;
        return this;
    }

    setDoctor(doctor: Doctor): this {
        this.appointment.doctorId = doctor.id;
        return this;
    }

    setDate(appointmentDate: Date): this {
        this.appointment.appointmentDate = appointmentDate;
        return this;
    }

    setReason(reason: string): this {
        this.appointment.reason = reason;
        return this;
    }

    build(): Appointment {
        return this.appointment;
    }
}