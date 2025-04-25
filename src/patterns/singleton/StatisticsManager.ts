import { StatisticsService } from '../../services/statistics.service';

export class StatisticsManager {
    private static instance: StatisticsManager;
    private statisticsService: StatisticsService;

    private constructor() {
        this.statisticsService = new StatisticsService();
    }

    public static getInstance(): StatisticsManager {
        if (!StatisticsManager.instance) {
            StatisticsManager.instance = new StatisticsManager();
        }
        return StatisticsManager.instance;
    }

    public getStatisticsService(): StatisticsService {
        return this.statisticsService;
    }
}