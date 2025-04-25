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
exports.ImportDetailRepository = void 0;
const typeorm_1 = require("typeorm");
const importDetail_model_1 = require("../models/importDetail.model");
const base_repository_1 = require("./base.repository");
class ImportDetailRepository extends base_repository_1.BaseRepository {
    constructor() {
        super((0, typeorm_1.getRepository)(importDetail_model_1.ImportDetail));
    }
    findByVoucherId(voucherId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, typeorm_1.getRepository)(importDetail_model_1.ImportDetail)
                .createQueryBuilder('detail')
                .leftJoinAndSelect('detail.medicalSupply', 'supply')
                .leftJoinAndSelect('detail.medicine', 'medicine')
                .where('detail.import_voucher_id = :voucherId', { voucherId })
                .getMany();
        });
    }
}
exports.ImportDetailRepository = ImportDetailRepository;
