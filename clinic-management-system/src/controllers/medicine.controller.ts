import { Request, Response } from 'express';
import { MedicineService } from '../services/medicine.service';
import { BadRequestException } from '../utils/exceptions';

const medicineService = new MedicineService();

export class MedicineController {
    // Lấy tất cả thuốc
    getAll =   (async (req: Request, res: Response) => {
        const medicines = await medicineService.getAll();
        return res.status(200).json({ success: true, data: medicines });
    });

    // Lấy thuốc theo ID
    getById =   (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid medicine ID');
        const medicine = await medicineService.getById(id);
        return res.status(200).json({ success: true, data: medicine });
    });

    // Lấy danh sách thuốc theo nhà cung cấp
    getBySupplier =   (async (req: Request, res: Response) => {
        const supplierId = parseInt(req.params.supplierId);
        if (isNaN(supplierId)) throw new BadRequestException('Invalid supplier ID');
        const medicines = await medicineService.getBySupplier(supplierId);
        return res.status(200).json({ success: true, data: medicines });
    });

    // Tạo mới thuốc
    create =   (async (req: Request, res: Response) => {
        const data = req.body;
        if (!data.name || !data.supplierId) throw new BadRequestException('name and supplierId are required');
        const medicine = await medicineService.createMedicine(data);
        return res.status(201).json({ success: true, data: medicine });
    });

    // Cập nhật thuốc
    update =   (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid medicine ID');
        const medicine = await medicineService.updateMedicine(id, req.body);
        return res.status(200).json({ success: true, data: medicine });
    });

    // Xóa thuốc
    delete =   (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid medicine ID');
        await medicineService.deleteMedicine(id);
        return res.status(200).json({ success: true, message: 'Medicine deleted successfully' });
    });
}