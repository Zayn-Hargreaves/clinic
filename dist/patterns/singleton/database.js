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
exports.DatabaseConnection = void 0;
const data_source_1 = require("../../data-source");
class DatabaseConnection {
    constructor() {
        this.dataSource = data_source_1.AppDataSource;
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
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
