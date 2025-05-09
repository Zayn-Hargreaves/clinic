import { Router } from 'express';
import { ImportVoucherController } from '../controllers/importVoucher.controller';
import { asyncHandler } from '../utils/asyncHandler';
const router = Router();
const controller = new ImportVoucherController();

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getByIdv2));
router.get('/supplier/:supplierId', asyncHandler(controller.getBySupplier));
router.post('/', asyncHandler(controller.create));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

export default router;