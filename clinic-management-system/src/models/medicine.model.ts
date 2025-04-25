import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Supplier } from './supplier.model';

@Entity('medicines')
export class Medicine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'unit_of_measure' })
    unitOfMeasure: string;

    @Column({ name: 'stock_quantity', default: 0 })
    stockQuantity: number;

    @Column()
    description: string;

    @Column({ name: 'supplier_id' })
    supplierId: number;

    @ManyToOne(() => Supplier, (supplier) => supplier.medicines)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;
}