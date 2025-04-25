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
exports.MedicalSupplyRepository = void 0;
const medicalSupply_model_1 = require("../models/medicalSupply.model");
const database_1 = require("../patterns/singleton/database");
const exceptions_1 = require("../utils/exceptions");
const inventoryObserver_1 = require("../patterns/observer/inventoryObserver");
class MedicalSupplyRepository {
    constructor() {
        this.repository = database_1.DatabaseConnection.getInstance().getDataSource().getRepository(medicalSupply_model_1.MedicalSupply);
        this.inventorySubject = new inventoryObserver_1.InventorySubject();
        this.inventorySubject.addObserver(new inventoryObserver_1.LowStockEmailObserver());
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const supply = yield this.repository.findOne({ where: { id } });
            if (!supply) {
                throw new exceptions_1.NotFoundException('Medical supply not found');
            }
            return supply;
        });
    }
    updateStock(id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const supply = yield this.findById(id);
            supply.stockQuantity += quantity;
            yield this.repository.save(supply);
            this.inventorySubject.notifyObservers(supply);
            return supply;
        });
    }
}
exports.MedicalSupplyRepository = MedicalSupplyRepository;
