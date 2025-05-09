import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MedicalSupply } from './medicalSupply.model';
import { ImportVoucher } from './importVoucher.model';
import { Medicine } from './medicine.model';

@Entity('suppliers')
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 'Chưa cập nhật' })
    contactInfo: string;

    @Column({default:"active"})
    status: string;

    @Column({
        default: 'khac',
    })
    type: string;

    @OneToMany(() => MedicalSupply, (supply) => supply.supplier)
    supplies: MedicalSupply[];

    @OneToMany(() => ImportVoucher, (voucher) => voucher.supplier)
    importVouchers: ImportVoucher[];

    @OneToMany(() => Medicine, (medicine) => medicine.supplier)
    medicines: Medicine[];
}