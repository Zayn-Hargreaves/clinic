import { Router } from 'express';
import { StatisticsController } from '../controllers/statistics.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const statisticsController = new StatisticsController();

router.get('/supplier-stats', asyncHandler(statisticsController.getSupplierStats));
router.get('/import-vouchers', asyncHandler(statisticsController.getImportVouchersBySupplier));
router.get('/import-vouchers/:id', asyncHandler(statisticsController.getImportVoucherDetails));

export default router;