"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsManager = void 0;
const statistics_service_1 = require("../../services/statistics.service");
class StatisticsManager {
    constructor() {
        this.statisticsService = new statistics_service_1.StatisticsService();
    }
    static getInstance() {
        if (!StatisticsManager.instance) {
            StatisticsManager.instance = new StatisticsManager();
        }
        return StatisticsManager.instance;
    }
    getStatisticsService() {
        return this.statisticsService;
    }
}
exports.StatisticsManager = StatisticsManager;
