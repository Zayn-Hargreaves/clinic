"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportProcessFacade = void 0;
class ImportProcessFacade {
    constructor(supplierRepository, medicalSupplyRepository) {
        this.supplierRepository = supplierRepository;
        this.medicalSupplyRepository = medicalSupplyRepository;
    }
    processImport(supplierId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.supplierRepository.findById(supplierId);
            for (const item of items) {
                yield this.medicalSupplyRepository.updateStock(item.supplyId, item.quantity);
            }
            return { success: true, supplier };
        });
    }
    getSupplierStats(startDate, endDate, search) {
        return __awaiter(this, void 0, void 0, function* () {
            // Phối hợp các repository để lấy thống kê
            const suppliers = yield this.supplierRepository.findByName(search);
            const stats = yield Promise.all(suppliers.map((supplier) => __awaiter(this, void 0, void 0, function* () {
                const vouchers = yield this.importVoucherRepository.findBySupplier(supplier.id, startDate, endDate);
                return {
                    supplier,
                    totalVouchers: vouchers.length,
                    totalValue: vouchers.reduce((sum, v) => sum + v.totalAmount, 0),
                };
            })));
            return stats;
        });
    }
}
exports.ImportProcessFacade = ImportProcessFacade;
