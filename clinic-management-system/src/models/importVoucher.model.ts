import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Supplier } from './supplier.model';
import { ImportDetail } from './importDetail.model';

@Entity('import_vouchers')
export class ImportVoucher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'import_date' })
    importDate: Date;

    @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
    totalAmount: number;

    @Column({ name: 'supplier_id' })
    supplierId: number;

    @Column({ name: 'employee_id', default:1 })
    employeeId: number;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => Supplier, (supplier) => supplier.importVouchers)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @OneToMany(() => ImportDetail, (detail) => detail.importVoucher)
    importDetails: ImportDetail[];
}