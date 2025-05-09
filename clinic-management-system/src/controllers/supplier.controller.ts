import { Request, Response, NextFunction } from 'express';
import { SupplierFacade } from '../patterns/facade/supplierFacade';
import { asyncHandler } from '../utils/asyncHandler';
import { BadRequestException } from '../utils/exceptions';

const supplierFacade = new SupplierFacade();

export class SupplierController {
  // Lấy tất cả nhà cung cấp
  getAllSuppliers = asyncHandler(async (req: Request, res: Response) => {
    const suppliers = await supplierFacade.getAllSuppliers();
    return res.status(200).json({ success: true, data: suppliers });
  });

  // Tìm kiếm theo tên
  searchSuppliers = asyncHandler(async (req: Request, res: Response) => {
    const name = req.query.name as string;
    if (!name) throw new BadRequestException('name query parameter is required');
    const suppliers = await supplierFacade.searchSuppliers(name);
    return res.status(200).json({ success: true, data: suppliers });
  });

  // Lấy chi tiết 1 supplier (kèm supplies, medicines, vouchers)
  getSupplierById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestException('Invalid supplier ID');
    const detail = await supplierFacade.getSupplierDetail(id);
    return res.status(200).json({ success: true, data: detail });
  });

  // Tạo mới supplier
  createSupplier = asyncHandler(async (req: Request, res: Response) => {
    const { name, contactInfo, type, status } = req.body;
    console.log(req.body)
    if (!name || !contactInfo || !type)
      throw new BadRequestException('name, contactInfo, and type are required');
    const supplier = await supplierFacade.createSupplier(
      { name, contactInfo, status: status || 'active' },
      type as 'Medicine' | 'Equipment'
    );
    return res.status(201).json({ success: true, data: supplier });
  });

  // Tạo mới từ external API (nếu có)
  createFromExternal = asyncHandler(async (req: Request, res: Response) => {
    const { externalData, type } = req.body;
    if (!externalData || !type)
      throw new BadRequestException('externalData and type are required');
    const supplier = await supplierFacade.createFromExternalApi(externalData, type);
    return res.status(201).json({ success: true, data: supplier });
  });

  // Cập nhật supplier
  updateSupplier = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestException('Invalid supplier ID');
    const supplier = await supplierFacade.updateSupplier(id, req.body);
    return res.status(200).json({ success: true, data: supplier });
  });

  // Xóa supplier (có kiểm tra liên kết)
  deleteSupplier = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new BadRequestException('Invalid supplier ID');
    await supplierFacade.deleteSupplier(id);
    return res.status(200).json({ success: true, message: 'Supplier deleted successfully' });
  });

  // Lấy danh sách active supplier
  getActiveSuppliers = asyncHandler(async (req: Request, res: Response) => {
    const suppliers = await supplierFacade.getActiveSuppliers();
    return res.status(200).json({ success: true, data: suppliers });
  });

  // Thống kê nhập vật tư/thuốc theo supplier
  getImportStats = asyncHandler(async (req: Request, res: Response) => {
    const supplierId = parseInt(req.params.id);
    if (isNaN(supplierId)) throw new BadRequestException('Invalid supplier ID');
    const { startDate, endDate } = req.query;
    const stats = await supplierFacade.getImportStats(
      supplierId,
      startDate as string | undefined,
      endDate as string | undefined
    );
    return res.status(200).json({ success: true, data: stats });
  });
}