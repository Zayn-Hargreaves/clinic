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
exports.ImportDetail = void 0;
const typeorm_1 = require("typeorm");
const importVoucher_model_1 = require("./importVoucher.model");
const medicalSupply_model_1 = require("./medicalSupply.model");
const medicine_model_1 = require("./medicine.model");
let ImportDetail = class ImportDetail {
};
exports.ImportDetail = ImportDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImportDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'import_voucher_id' }),
    __metadata("design:type", Number)
], ImportDetail.prototype, "importVoucherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_id' }),
    __metadata("design:type", Number)
], ImportDetail.prototype, "itemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_type' }),
    __metadata("design:type", String)
], ImportDetail.prototype, "itemType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ImportDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ImportDetail.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ImportDetail.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => importVoucher_model_1.ImportVoucher, (voucher) => voucher.importDetails),
    (0, typeorm_1.JoinColumn)({ name: 'import_voucher_id' }),
    __metadata("design:type", importVoucher_model_1.ImportVoucher)
], ImportDetail.prototype, "importVoucher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medicalSupply_model_1.MedicalSupply, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id', referencedColumnName: 'id' }),
    __metadata("design:type", medicalSupply_model_1.MedicalSupply)
], ImportDetail.prototype, "medicalSupply", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medicine_model_1.Medicine, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'item_id', referencedColumnName: 'id' }),
    __metadata("design:type", medicine_model_1.Medicine)
], ImportDetail.prototype, "medicine", void 0);
exports.ImportDetail = ImportDetail = __decorate([
    (0, typeorm_1.Entity)('import_details')
], ImportDetail);
