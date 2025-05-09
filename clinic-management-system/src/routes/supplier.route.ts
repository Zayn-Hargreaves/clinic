import { Router } from 'express';
import { SupplierController } from '../controllers/supplier.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const supplierController = new SupplierController();

router.get('/', asyncHandler(supplierController.getAllSuppliers));
router.get('/active', asyncHandler(supplierController.getActiveSuppliers));
router.get('/search', asyncHandler(supplierController.searchSuppliers));
router.get('/:id', asyncHandler(supplierController.getSupplierById));
router.post('/', asyncHandler(supplierController.createSupplier));
router.post('/external', asyncHandler(supplierController.createFromExternal));
router.put('/:id', asyncHandler(supplierController.updateSupplier));
router.delete('/:id', asyncHandler(supplierController.deleteSupplier));
router.get('/:id/import-stats', asyncHandler(supplierController.getImportStats))    ;

export default router;