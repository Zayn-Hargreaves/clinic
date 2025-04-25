import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ImportVoucher } from './importVoucher.model';
import { MedicalSupply } from './medicalSupply.model';
import { Medicine } from './medicine.model';

@Entity('import_details')
export class ImportDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'import_voucher_id' })
    importVoucherId: number;

    @Column({ name: 'item_id' })
    itemId: number;

    @Column({ name: 'item_type' })
    itemType: 'medicine' | 'supply';

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice: number;

    @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @ManyToOne(() => ImportVoucher, (voucher) => voucher.importDetails)
    @JoinColumn({ name: 'import_voucher_id' })
    importVoucher: ImportVoucher;

    @ManyToOne(() => MedicalSupply, { nullable: true })
    @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
    medicalSupply: MedicalSupply;

    @ManyToOne(() => Medicine, { nullable: true })
    @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
    medicine: Medicine;
}