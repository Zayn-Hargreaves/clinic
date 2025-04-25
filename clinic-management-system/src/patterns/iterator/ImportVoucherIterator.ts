import { ImportVoucher } from '../../models/importVoucher.model';
import { ImportVoucherRepository } from '../../repositories/importVoucher.repository';

export class ImportVoucherIterator {
    private vouchers: ImportVoucher[] = [];
    private index = 0;

    constructor(private repository: ImportVoucherRepository, supplierId: number, limit: number) {
        this.loadVouchers(supplierId, limit);
    }

    private async loadVouchers(supplierId: number, limit: number) {
        this.vouchers = (await this.repository.findBySupplier(supplierId, limit));
    }

    hasNext(): boolean {
        return this.index < this.vouchers.length;
    }

    next(): ImportVoucher | null {
        if (this.hasNext()) {
            return this.vouchers[this.index++];
        }
        return null;
    }
}