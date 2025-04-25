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
exports.SupplierController = void 0;
const supplier_service_1 = require("../services/supplier.service");
const asyncHandler_1 = require("../utils/asyncHandler");
const exceptions_1 = require("../utils/exceptions");
class SupplierController {
    constructor() {
        this.getAllSuppliers = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const suppliers = yield this.supplierService.getAllSuppliers();
            return res.status(200).json({ success: true, data: suppliers });
        }));
        this.getSupplierById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new exceptions_1.BadRequestException('Invalid supplier ID');
            }
            const supplier = yield this.supplierService.getSupplierById(idNum);
            return res.status(200).json({ success: true, data: supplier });
        }));
        this.createSupplier = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, contactInfo, type, status } = req.body;
            if (!name || !contactInfo || !type) {
                throw new exceptions_1.BadRequestException('name, contactInfo, and type are required');
            }
            const supplierData = { name, contactInfo, status: status || 'active' };
            const supplier = yield this.supplierService.createSupplier(supplierData, type);
            return res.status(201).json({ success: true, data: supplier });
        }));
        this.updateSupplier = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new exceptions_1.BadRequestException('Invalid supplier ID');
            }
            const supplierData = req.body;
            const supplier = yield this.supplierService.updateSupplier(idNum, supplierData);
            return res.status(200).json({ success: true, data: supplier });
        }));
        this.deleteSupplier = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const idNum = parseInt(id);
            if (isNaN(idNum)) {
                throw new exceptions_1.BadRequestException('Invalid supplier ID');
            }
            yield this.supplierService.deleteSupplier(idNum);
            return res.status(200).json({ success: true, message: 'Supplier deleted successfully' });
        }));
        this.searchSuppliers = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const name = req.query.name;
            if (!name) {
                throw new exceptions_1.BadRequestException('name query parameter is required');
            }
            const suppliers = yield this.supplierService.searchSuppliers(name);
            return res.status(200).json({ success: true, data: suppliers });
        }));
        this.supplierService = new supplier_service_1.SupplierService();
    }
}
exports.SupplierController = SupplierController;
