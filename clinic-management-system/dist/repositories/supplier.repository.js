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
exports.SupplierRepository = void 0;
const supplier_model_1 = require("../models/supplier.model");
const database_1 = require("../patterns/singleton/database");
const exceptions_1 = require("../utils/exceptions");
const supplierFactory_1 = require("../patterns/factory/supplierFactory");
const external_supplier_adapter_1 = require("../patterns/adapter/external-supplier.adapter");
const inventoryObserver_1 = require("../patterns/observer/inventoryObserver");
const importFacade_1 = require("../patterns/facade/importFacade");
const medicalSupply_repository_1 = require("./medicalSupply.repository");
class SupplierRepository {
    constructor() {
        this.repository = database_1.DatabaseConnection.getInstance().getDataSource().getRepository(supplier_model_1.Supplier);
        this.inventorySubject = new inventoryObserver_1.InventorySubject();
        this.inventorySubject.addObserver(new inventoryObserver_1.LowStockEmailObserver());
        this.importFacade = new importFacade_1.ImportProcessFacade(this, new medicalSupply_repository_1.MedicalSupplyRepository());
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.repository.findOne({ where: { id } });
            if (!supplier) {
                throw new exceptions_1.NotFoundException('Supplier not found');
            }
            return supplier;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new exceptions_1.NotFoundException("Supplier not found");
            }
            return this.repository
                .createQueryBuilder('supplier')
                .where('supplier.name LIKE :name', { name: `%${name}%` })
                .getMany();
        });
    }
    findActiveSuppliers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository
                .createQueryBuilder('supplier')
                .where('supplier.status = :status', { status: 'active' })
                .getMany();
        });
    }
    createSupplier(data, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = type === 'Medicine' ? new supplierFactory_1.MedicineSupplierFactory() : new supplierFactory_1.EquipmentSupplierFactory();
            const supplier = factory.createSupplier(data);
            const savedSupplier = yield this.repository.save(supplier);
            yield this.notifyInventoryChange(savedSupplier);
            return savedSupplier;
        });
    }
    createFromExternalData(externalData, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplierData = external_supplier_adapter_1.ExternalSupplierAdapter.toSupplierData(externalData);
            return this.createSupplier(supplierData, type);
        });
    }
    updateSupplier(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.findById(id);
            Object.assign(supplier, data);
            const updatedSupplier = yield this.repository.save(supplier);
            yield this.notifyInventoryChange(updatedSupplier);
            return updatedSupplier;
        });
    }
    deleteSupplier(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield this.findById(id);
            yield this.repository.remove(supplier);
            yield this.notifyInventoryChange(supplier);
        });
    }
    processImport(supplierId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.importFacade.processImport(supplierId, items);
        });
    }
    notifyInventoryChange(supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplies = yield this.repository
                .createQueryBuilder('supplier')
                .relation(supplier_model_1.Supplier, 'supplies')
                .of(supplier)
                .loadMany();
            supplies.forEach((supply) => this.inventorySubject.notifyObservers(supply));
        });
    }
}
exports.SupplierRepository = SupplierRepository;
