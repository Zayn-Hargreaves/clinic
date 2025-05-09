import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Supplier } from './supplier.model';

@Entity('medical_supplies')
export class MedicalSupply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'Chưa xác định' })
    name: string;

    @Column({
        name: 'unit_of_measure',
        type: 'enum',
        enum: ['piece', 'box', 'liter', 'kg', 'unit'],
        default: 'unit',
    })
    unitOfMeasure: string;

    @Column({ name: 'stock_quantity', default: 0 })
    stockQuantity: number;

    @Column({ default: 'Chưa có mô tả' })
    description: string;

    @Column({ name: 'supplier_id', nullable: true })
    supplierId: number;

    @ManyToOne(() => Supplier, supplier => supplier.supplies)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;
}