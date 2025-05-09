"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.DatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const patient_model_1 = require("../../models/patient.model");
const doctor_model_1 = require("../../models/doctor.model");
const appointment_model_1 = require("../../models/appointment.model");
const supplier_model_1 = require("../../models/supplier.model");
const medicine_model_1 = require("../../models/medicine.model");
const medicalSupply_model_1 = require("../../models/medicalSupply.model");
const importVoucher_model_1 = require("../../models/importVoucher.model");
const importDetail_model_1 = require("../../models/importDetail.model");
dotenv.config();
class DatabaseConnection {
    constructor() {
        this.dataSource = new typeorm_1.DataSource({
            type: 'mysql',
            url: process.env.DATABASE_URL,
            entities: [
                patient_model_1.Patient,
                doctor_model_1.Doctor,
                appointment_model_1.Appointment,
                supplier_model_1.Supplier,
                medicine_model_1.Medicine,
                medicalSupply_model_1.MedicalSupply,
                importVoucher_model_1.ImportVoucher,
                importDetail_model_1.ImportDetail,
            ],
            migrations: ['src/migrations/*.ts'],
            synchronize: false,
            logging: true,
        });
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
            console.log(DatabaseConnection.instance);
        }
        return DatabaseConnection.instance;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dataSource.isInitialized) {
                yield this.dataSource.initialize();
                console.log('Database connected');
            }
        });
    }
    getDataSource() {
        return this.dataSource;
    }
}
exports.DatabaseConnection = DatabaseConnection;
