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
exports.ImportVoucher = void 0;
const typeorm_1 = require("typeorm");
const supplier_model_1 = require("./supplier.model");
const importDetail_model_1 = require("./importDetail.model");
let ImportVoucher = class ImportVoucher {
};
exports.ImportVoucher = ImportVoucher;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImportVoucher.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'import_date' }),
    __metadata("design:type", Date)
], ImportVoucher.prototype, "importDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ImportVoucher.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'supplier_id' }),
    __metadata("design:type", Number)
], ImportVoucher.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    __metadata("design:type", Number)
], ImportVoucher.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], ImportVoucher.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_model_1.Supplier, (supplier) => supplier.importVouchers),
    (0, typeorm_1.JoinColumn)({ name: 'supplier_id' }),
    __metadata("design:type", supplier_model_1.Supplier)
], ImportVoucher.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => importDetail_model_1.ImportDetail, (detail) => detail.importVoucher),
    __metadata("design:type", Array)
], ImportVoucher.prototype, "importDetails", void 0);
exports.ImportVoucher = ImportVoucher = __decorate([
    (0, typeorm_1.Entity)('import_vouchers')
], ImportVoucher);
