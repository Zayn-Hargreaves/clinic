import { ImportProcessFacade } from "../facade/importFacade";

export abstract class ReportTemplate {
    async generateReport(params: any): Promise<any> {
        const data = await this.fetchData(params);
        const processed = this.processData(data);
        return this.formatReport(processed);
    }

    protected abstract fetchData(params: any): Promise<any>;
    protected abstract processData(data: any): any;
    protected abstract formatReport(processed: any): any;
}

export class SupplierStatsReport extends ReportTemplate {
    constructor(private importFacade: ImportProcessFacade) {
        super();
    }

    protected async fetchData(params: { startDate: string; endDate: string; search?: string }) {
        return this.importFacade.getSupplierStats(params.startDate, params.endDate, params.search);
    }

    protected processData(data: any) {
        return data.map((stat: any) => ({
            supplierName: stat.supplier.name,
            totalVouchers: stat.totalVouchers,
            totalValue: stat.totalValue,
        }));
    }

    protected formatReport(processed: any) {
        return { success: true, data: processed };
    }
}