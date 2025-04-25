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
exports.PatientRepository = void 0;
const patient_model_1 = require("../models/patient.model");
const data_source_1 = require("../data-source");
const exceptions_1 = require("../utils/exceptions");
class PatientRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(patient_model_1.Patient);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.repository.findOne({ where: { id } });
            if (!patient) {
                throw new exceptions_1.NotFoundException('Patient not found');
            }
            return patient;
        });
    }
}
exports.PatientRepository = PatientRepository;
