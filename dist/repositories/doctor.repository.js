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
exports.DoctorRepository = void 0;
const doctor_model_1 = require("../models/doctor.model");
const data_source_1 = require("../data-source");
const exceptions_1 = require("../utils/exceptions");
class DoctorRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(doctor_model_1.Doctor);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.repository.findOne({ where: { id } });
            if (!doctor) {
                throw new exceptions_1.NotFoundException('Doctor not found');
            }
            return doctor;
        });
    }
}
exports.DoctorRepository = DoctorRepository;
