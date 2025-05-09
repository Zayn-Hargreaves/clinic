import { Router } from 'express';
import { MedicalSupplyController } from '../controllers/medicalSupply.controller';
import { asyncHandler } from '../utils/asyncHandler';
const router = Router();
const controller = new MedicalSupplyController();

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.get('/supplier/:supplierId',asyncHandler(controller.getBySupplier));
router.post('/', asyncHandler(controller.create));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));
router.patch('/:id/stock', asyncHandler(controller.updateStock));

export default router;