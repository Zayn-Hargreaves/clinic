import { DatabaseConnection } from '../src/patterns/singleton/database';
import { Supplier } from '../src/models/supplier.model';
import { Medicine } from '../src/models/medicine.model';
import { MedicalSupply } from '../src/models/medicalSupply.model';
import { ImportVoucher } from '../src/models/importVoucher.model';
import { ImportDetail } from '../src/models/importDetail.model';

async function main() {
    const db = DatabaseConnection.getInstance();
    await db.initialize();
    const AppDataSource = db.getDataSource();

    // Suppliers
    const supplier1 = AppDataSource.manager.create(Supplier, { name: 'Công ty ABC' });
    const supplier2 = AppDataSource.manager.create(Supplier, { name: 'Công ty XYZ' });
    const supplier3 = AppDataSource.manager.create(Supplier, { name: 'Công ty Pharma' });
    await AppDataSource.manager.save([supplier1, supplier2, supplier3]);

    // Medicines
    const med1 = AppDataSource.manager.create(Medicine, { name: 'Paracetamol', supplier: supplier1 });
    const med2 = AppDataSource.manager.create(Medicine, { name: 'Aspirin', supplier: supplier1 });
    const med3 = AppDataSource.manager.create(Medicine, { name: 'Vitamin C', supplier: supplier2 });
    const med4 = AppDataSource.manager.create(Medicine, { name: 'Amoxicillin', supplier: supplier3 });
    await AppDataSource.manager.save([med1, med2, med3, med4]);

    // Medical Supplies
    const supply1 = AppDataSource.manager.create(MedicalSupply, { name: 'Bông y tế', supplier: supplier2 });
    const supply2 = AppDataSource.manager.create(MedicalSupply, { name: 'Găng tay', supplier: supplier2 });
    const supply3 = AppDataSource.manager.create(MedicalSupply, { name: 'Khẩu trang', supplier: supplier3 });
    await AppDataSource.manager.save([supply1, supply2, supply3]);

    // Import Vouchers
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    const voucher1 = AppDataSource.manager.create(ImportVoucher, { supplier: supplier1, importDate: lastWeek, totalAmount: 1000000 });
    const voucher2 = AppDataSource.manager.create(ImportVoucher, { supplier: supplier1, importDate: today, totalAmount: 500000 });
    const voucher3 = AppDataSource.manager.create(ImportVoucher, { supplier: supplier2, importDate: twoDaysAgo, totalAmount: 750000 });
    const voucher4 = AppDataSource.manager.create(ImportVoucher, { supplier: supplier3, importDate: today, totalAmount: 1200000 });
    await AppDataSource.manager.save([voucher1, voucher2, voucher3, voucher4]);

    // Import Details
    const detail1 = AppDataSource.manager.create(ImportDetail, {
        importVoucher: voucher1,
        itemType: 'medicine',
        itemId: med1.id,
        quantity: 20,
        unitPrice: 25000,
        totalPrice: 500000,
        medicine: med1
    });
    const detail2 = AppDataSource.manager.create(ImportDetail, {
        importVoucher: voucher1,
        itemType: 'medicine',
        itemId: med2.id,
        quantity: 10,
        unitPrice: 50000,
        totalPrice: 500000,
        medicine: med2
    });
    const detail3 = AppDataSource.manager.create(ImportDetail, {
        importVoucher: voucher2,
        itemType: 'medicine',
        itemId: med1.id,
        quantity: 5,
        unitPrice: 50000,
        totalPrice: 250000,
        medicine: med1
    });
    const detail4 = AppDataSource.manager.create(ImportDetail, {
        importVoucher: voucher2,
        itemType: 'medicine',
        itemId: med2.id,
        quantity: 5,
        unitPrice: 50000,
        totalPrice: 250000,
        medicine: med2
    });
    const detail5 = AppDataSource.manager.create(ImportDetail, {
        importVoucher: voucher3,
        itemType: 'supply',
        itemId: supply1.id,
        quantity: 50,
        unitPrice: 10000,
        totalPrice: 500000,
        medicalSupply: supply1
    });
    const detail6 = AppDataSource.manager.create(ImportDetail, {
        importVoucher: voucher3,
        itemType: 'supply',
        itemId: supply2.id,
        quantity: 25,
        unitPrice: 10000,
        totalPrice: 250000,
        medicalSupply: supply2
    });
    const detail7 = AppDataSource.manager.create(ImportDetail, {
        importVoucher: voucher4,
        itemType: 'medicine',
        itemId: med4.id,
        quantity: 15,
        unitPrice: 80000,
        totalPrice: 1200000,
        medicine: med4
    });
    await AppDataSource.manager.save([detail1, detail2, detail3, detail4, detail5, detail6, detail7]);

    console.log('Seeded successfully with multiple suppliers, medicines, supplies, vouchers, and details!');
    await AppDataSource.destroy();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});