import { Request, Response } from 'express';
import { MedicalSupplyService } from '../services/medicalSupply.service';
import { BadRequestException } from '../utils/exceptions';

const medicalSupplyService = new MedicalSupplyService();

export class MedicalSupplyController {
    // Lấy tất cả vật tư y tế
    getAll = (async (req: Request, res: Response) => {
        const supplies = await medicalSupplyService.getAll();
        return res.status(200).json({ success: true, data: supplies });
    });

    // Lấy vật tư y tế theo ID
    getById =  (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid supply ID');
        const supply = await medicalSupplyService.getById(id);
        return res.status(200).json({ success: true, data: supply });
    });

    // Lấy vật tư y tế theo nhà cung cấp
    getBySupplier =  (async (req: Request, res: Response) => {
        const supplierId = parseInt(req.params.supplierId);
        if (isNaN(supplierId)) throw new BadRequestException('Invalid supplier ID');
        const supplies = await medicalSupplyService.getBySupplier(supplierId);
        return res.status(200).json({ success: true, data: supplies });
    });

    // Tạo mới vật tư y tế
    create =  (async (req: Request, res: Response) => {
        const data = req.body;
        if (!data.name || !data.supplierId) throw new BadRequestException('name and supplierId are required');
        const supply = await medicalSupplyService.createMedicalSupply(data);
        return res.status(201).json({ success: true, data: supply });
    });

    // Cập nhật vật tư y tế
    update =  (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid supply ID');
        const supply = await medicalSupplyService.updateMedicalSupply(id, req.body);
        return res.status(200).json({ success: true, data: supply });
    });

    // Xóa vật tư y tế
    delete =  (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid supply ID');
        await medicalSupplyService.deleteMedicalSupply(id);
        return res.status(200).json({ success: true, message: 'Medical supply deleted successfully' });
    });

    // Cập nhật tồn kho (stock)
    updateStock =  (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { quantity } = req.body;
        if (isNaN(id) || typeof quantity !== 'number') throw new BadRequestException('Invalid input');
        const supply = await medicalSupplyService.updateStock(id, quantity);
        return res.status(200).json({ success: true, data: supply });
    });
}