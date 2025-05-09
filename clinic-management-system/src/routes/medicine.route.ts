import { Router } from 'express';
import { MedicineController } from '../controllers/medicine.controller';

import { asyncHandler } from '../utils/asyncHandler';
const router = Router();
const controller = new MedicineController();

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', asyncHandler(controller.getById));
router.get('/supplier/:supplierId', asyncHandler(controller.getBySupplier));
router.post('/', asyncHandler(controller.create));
router.put('/:id', asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.delete));

export default router;