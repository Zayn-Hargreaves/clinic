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
exports.StatisticsController = void 0;
const exceptions_1 = require("../utils/exceptions");
const StatisticsManager_1 = require("../patterns/singleton/StatisticsManager");
const StatisticsCacheProxy_1 = require("../patterns/proxy/StatisticsCacheProxy");
class StatisticsController {
    constructor() {
        this.getSupplierStats = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { start_date, end_date, search } = req.query;
                if (!start_date || !end_date) {
                    throw new exceptions_1.BadRequestException('start_date and end_date are required');
                }
                const stats = yield this.statisticsProxy.getSupplierStats(start_date, end_date, search);
                return res.status(200).json(stats);
            }
            catch (error) {
                next(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
        this.getImportVouchersBySupplier = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { supplier_id, start_date, end_date, page = '1', limit = '10' } = req.query;
                if (!supplier_id) {
                    throw new exceptions_1.BadRequestException('supplier_id is required');
                }
                const result = yield this.statisticsService.getImportVouchersBySupplier(parseInt(supplier_id), start_date, end_date, parseInt(page), parseInt(limit));
                return res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                next(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
        this.getImportVoucherDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const idNum = parseInt(id);
                if (isNaN(idNum)) {
                    throw new exceptions_1.BadRequestException('Invalid voucher ID');
                }
                const details = yield this.statisticsService.getImportVoucherDetails(idNum);
                return res.status(200).json({ success: true, data: details });
            }
            catch (error) {
                next(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
        this.statisticsService = StatisticsManager_1.StatisticsManager.getInstance().getStatisticsService();
        this.statisticsProxy = new StatisticsCacheProxy_1.StatisticsCacheProxy(this.statisticsService);
    }
}
exports.StatisticsController = StatisticsController;
