import { Router } from 'express';
import { SupplierController } from '../controllers/supplier.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const supplierController = new SupplierController();

router.get('/', asyncHandler(supplierController.getAllSuppliers));
router.get('/search', asyncHandler(supplierController.searchSuppliers));
router.get('/:id', asyncHandler(supplierController.getSupplierById));
router.post('/', asyncHandler(supplierController.createSupplier));
router.put('/:id', asyncHandler(supplierController.updateSupplier));
router.delete('/:id', asyncHandler(supplierController.deleteSupplier));

export default router;