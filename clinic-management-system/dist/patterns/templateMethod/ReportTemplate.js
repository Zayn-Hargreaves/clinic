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
exports.SupplierStatsReport = exports.ReportTemplate = void 0;
class ReportTemplate {
    generateReport(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.fetchData(params);
            const processed = this.processData(data);
            return this.formatReport(processed);
        });
    }
}
exports.ReportTemplate = ReportTemplate;
class SupplierStatsReport extends ReportTemplate {
    constructor(importFacade) {
        super();
        this.importFacade = importFacade;
    }
    fetchData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.importFacade.getSupplierStats(params.startDate, params.endDate, params.search);
        });
    }
    processData(data) {
        return data.map((stat) => ({
            supplierName: stat.supplier.name,
            totalVouchers: stat.totalVouchers,
            totalValue: stat.totalValue,
        }));
    }
    formatReport(processed) {
        return { success: true, data: processed };
    }
}
exports.SupplierStatsReport = SupplierStatsReport;
