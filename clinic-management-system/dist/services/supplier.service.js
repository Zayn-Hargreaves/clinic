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
exports.SupplierService = void 0;
const supplier_repository_1 = require("../repositories/supplier.repository");
const exceptions_1 = require("../utils/exceptions");
class SupplierService {
    constructor() {
        this.supplierRepository = new supplier_repository_1.SupplierRepository();
    }
    getAllSuppliers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.findAll();
        });
    }
    getSupplierById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.findById(id);
        });
    }
    createSupplier(data, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.name || !data.contactInfo) {
                throw new exceptions_1.BadRequestException('Name and contactInfo are required');
            }
            return this.supplierRepository.createSupplier(data, type);
        });
    }
    createFromExternalApi(externalData, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.createFromExternalData(externalData, type);
        });
    }
    searchSuppliers(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.findByName(name);
        });
    }
    findActiveSuppliers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.findActiveSuppliers();
        });
    }
    updateSupplier(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.updateSupplier(id, data);
        });
    }
    deleteSupplier(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.deleteSupplier(id);
        });
    }
    importSupplies(supplierId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.supplierRepository.processImport(supplierId, items);
        });
    }
}
exports.SupplierService = SupplierService;
