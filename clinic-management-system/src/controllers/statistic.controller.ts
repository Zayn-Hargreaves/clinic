import { Request, Response, NextFunction } from 'express';
import { StatisticsService } from '../services/statistics.service';
import { BadRequestException } from '../utils/exceptions';

export class StatisticsController {
    private readonly statisticsService = new StatisticsService();

    getSupplierStats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { start_date, end_date, search } = req.query;
            if (!start_date || !end_date) throw new BadRequestException('start_date and end_date are required');
            const stats = await this.statisticsService.getSupplierStats(start_date as string, end_date as string, search as string);
            return res.status(200).json({ success: true, data: stats });
        } catch (error) {
            next(error);
        }
    };

    getImportVouchersBySupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { supplier_id, start_date, end_date, page = '1', limit = '10' } = req.query;
            if (!supplier_id) throw new BadRequestException('supplier_id is required');
            const result = await this.statisticsService.getImportVouchersBySupplier(
                parseInt(supplier_id as string),
                start_date as string,
                end_date as string,
                parseInt(page as string),
                parseInt(limit as string)
            );
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    };

    getImportVoucherDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const idNum = parseInt(id);
            if (isNaN(idNum)) throw new BadRequestException('Invalid voucher ID');
            const details = await this.statisticsService.getImportVoucherDetails(idNum);
            return res.status(200).json({ success: true, data: details });
        } catch (error) {
            next(error);
        }
    };
}