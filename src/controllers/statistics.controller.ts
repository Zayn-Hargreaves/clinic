import { Request, Response, NextFunction } from 'express';
import { StatisticsService } from '../services/statistics.service';
import { BadRequestException } from '../utils/exceptions';
import { StatisticsManager } from '../patterns/singleton/StatisticsManager';
import { StatisticsCacheProxy } from '../patterns/proxy/StatisticsCacheProxy';
export class StatisticsController {
    private readonly statisticsService: StatisticsService;
    private readonly statisticsProxy: StatisticsCacheProxy;
    constructor() {
        this.statisticsService = StatisticsManager.getInstance().getStatisticsService();
        this.statisticsProxy = new StatisticsCacheProxy(this.statisticsService)
    }

    getSupplierStats = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { start_date, end_date, search } = req.query;
            if (!start_date || !end_date) {
                throw new BadRequestException('start_date and end_date are required');
            }
            const stats = await this.statisticsProxy.getSupplierStats(start_date as string, end_date as string, search as string);
            return res.status(200).json(stats);
        } catch (error) {
            next(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
    getImportVouchersBySupplier = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { supplier_id, start_date, end_date, page = '1', limit = '10' } = req.query;
            if (!supplier_id) {
                throw new BadRequestException('supplier_id is required');
            }

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
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };

    getImportVoucherDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { id } = req.params;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new BadRequestException('Invalid voucher ID');
            }
            const details = await this.statisticsService.getImportVoucherDetails(idNum);
            return res.status(200).json({ success: true, data: details });
        } catch (error) {
            next(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
}