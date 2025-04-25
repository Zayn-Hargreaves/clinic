import { Request, Response, NextFunction } from 'express';
import { SupplierService } from '../services/supplier.service';
import { asyncHandler } from '../utils/asyncHandler';
import { BadRequestException } from '../utils/exceptions';

export class SupplierController {
    private readonly supplierService: SupplierService;

    constructor() {
        this.supplierService = new SupplierService();
    }

    getAllSuppliers = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const suppliers = await this.supplierService.getAllSuppliers();
        return res.status(200).json({ success: true, data: suppliers });
    });

    getSupplierById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id;
        const idNum = parseInt(id);
        if (isNaN(idNum)) {
            throw new BadRequestException('Invalid supplier ID');
        }
        const supplier = await this.supplierService.getSupplierById(idNum);
        return res.status(200).json({ success: true, data: supplier });
    });

    createSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { name, contactInfo, type, status } = req.body;
        if (!name || !contactInfo || !type) {
            throw new BadRequestException('name, contactInfo, and type are required');
        }
        const supplierData = { name, contactInfo, status: status || 'active' };
        const supplier = await this.supplierService.createSupplier(supplierData, type as 'Medicine' | 'Equipment');
        return res.status(201).json({ success: true, data: supplier });
    });

    updateSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id;
        const idNum = parseInt(id);
        if (isNaN(idNum)) {
            throw new BadRequestException('Invalid supplier ID');
        }
        const supplierData = req.body;
        const supplier = await this.supplierService.updateSupplier(idNum, supplierData);
        return res.status(200).json({ success: true, data: supplier });
    });

    deleteSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id;
        const idNum = parseInt(id);
        if (isNaN(idNum)) {
            throw new BadRequestException('Invalid supplier ID');
        }
        await this.supplierService.deleteSupplier(idNum);
        return res.status(200).json({ success: true, message: 'Supplier deleted successfully' });
    });

    searchSuppliers = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const name = req.query.name;
        if (!name) {
            throw new BadRequestException('name query parameter is required');
        }
        const suppliers = await this.supplierService.searchSuppliers(name as string);
        return res.status(200).json({ success: true, data: suppliers });
    });
}