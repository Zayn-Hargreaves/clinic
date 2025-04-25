import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  doctorId: number;

  @Column()
  appointmentDate: Date;

  @Column({ nullable: true })
  reason: string;
}