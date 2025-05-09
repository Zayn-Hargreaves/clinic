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
exports.ImportVoucherRepository = void 0;
const importVoucher_model_1 = require("../models/importVoucher.model");
const database_1 = require("../patterns/singleton/database");
const exceptions_1 = require("../utils/exceptions");
class ImportVoucherRepository {
    constructor() {
        this.repository = database_1.DatabaseConnection.getInstance().getDataSource().getRepository(importVoucher_model_1.ImportVoucher);
    }
    findBySupplier(supplierId, arg1, arg2) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.repository.createQueryBuilder('voucher').where('voucher.supplierId = :supplierId', { supplierId });
            if (typeof arg1 === 'string' && arg2) {
                query.andWhere('voucher.createdAt BETWEEN :startDate AND :endDate', { startDate: arg1, endDate: arg2 });
            }
            else if (typeof arg1 === 'number') {
                query.take(arg1);
            }
            return query.getMany();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const voucher = yield this.repository.findOne({ where: { id } });
            if (!voucher) {
                throw new exceptions_1.NotFoundException('Import voucher not found');
            }
            return voucher;
        });
    }
}
exports.ImportVoucherRepository = ImportVoucherRepository;
