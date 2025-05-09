"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const typeorm_1 = require("typeorm");
const medicalSupply_model_1 = require("./medicalSupply.model");
const importVoucher_model_1 = require("./importVoucher.model");
const medicine_model_1 = require("./medicine.model");
let Supplier = class Supplier {
};
exports.Supplier = Supplier;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Supplier.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "contactInfo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => medicalSupply_model_1.MedicalSupply, (supply) => supply.supplier),
    __metadata("design:type", Array)
], Supplier.prototype, "supplies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => importVoucher_model_1.ImportVoucher, (voucher) => voucher.supplier),
    __metadata("design:type", Array)
], Supplier.prototype, "importVouchers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => medicine_model_1.Medicine, (medicine) => medicine.supplier),
    __metadata("design:type", Array)
], Supplier.prototype, "medicines", void 0);
exports.Supplier = Supplier = __decorate([
    (0, typeorm_1.Entity)('suppliers')
], Supplier);
