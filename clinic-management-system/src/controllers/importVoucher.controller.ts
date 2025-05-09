import { Request, Response } from 'express';
import { ImportVoucherService } from '../services/import.service';
import { BadRequestException } from '../utils/exceptions';

const importVoucherService = new ImportVoucherService();

export class ImportVoucherController {
    // Lấy tất cả phiếu nhập
    getAll =   (async (req: Request, res: Response) => {
        const vouchers = await importVoucherService.findAll();
        console.log(vouchers)
        return res.status(200).json({ success: true, data: vouchers });
    });

    // Lấy phiếu nhập theo ID
    getById =   (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid import voucher ID');
        const voucher = await importVoucherService.getById(id);
        return res.status(200).json({ success: true, data: voucher });
    });

    // Lấy phiếu nhập theo nhà cung cấp (có thể lọc theo ngày)
    getBySupplier =   (async (req: Request, res: Response) => {
        const supplierId = parseInt(req.params.supplierId);
        if (isNaN(supplierId)) throw new BadRequestException('Invalid supplier ID');
        const { startDate, endDate } = req.query;
        const vouchers = await importVoucherService.getBySupplier(
            supplierId,
            typeof startDate === 'string' ? startDate : undefined,
            typeof endDate === 'string' ? endDate : undefined
        );
        return res.status(200).json({ success: true, data: vouchers });
    });

    // Tạo mới phiếu nhập
    
    create =  (async (req: Request, res: Response) => {
        console.log("controler::",req.body)
        const data = req.body;
        if (!data.supplierId || !data.importDate) throw new BadRequestException('supplierId and importDate are required');
        const voucher = await importVoucherService.createImportVoucher(data);
        return res.status(201).json({ success: true, data: voucher });
    });

    // Cập nhật phiếu nhập
    update =   (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid import voucher ID');
        const voucher = await importVoucherService.updateImportVoucher(id, req.body);
        return res.status(200).json({ success: true, data: voucher });
    });

    // Xóa phiếu nhập
    delete =   (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new BadRequestException('Invalid import voucher ID');
        await importVoucherService.deleteImportVoucher(id);
        return res.status(200).json({ success: true, message: 'Import voucher deleted successfully' });
    });
    getByIdv2 = (async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        console.log("id:::",id)
        if (isNaN(id)) {
            throw new BadRequestException('Invalid import voucher ID');
        }
        const voucher = await importVoucherService.getByIdv2(id);
        return res.status(200).json({ success: true, data: voucher });
    });
}