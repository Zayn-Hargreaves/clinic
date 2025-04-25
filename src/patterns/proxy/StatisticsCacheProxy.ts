import { StatisticsService } from '../../services/statistics.service';

export class StatisticsCacheProxy {
    private cache: Map<string, any> = new Map();

    constructor(private service: StatisticsService) { }

    async getSupplierStats(startDate: string, endDate: string, search?: string): Promise<any> {
        const cacheKey = `stats_${startDate}_${endDate}_${search || ''}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const result = await this.service.getSupplierStats(startDate, endDate, search);
        this.cache.set(cacheKey, result);
        return result;
    }
}