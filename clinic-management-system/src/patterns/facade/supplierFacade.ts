import { SupplierService } from '../../services/supplier.service';
import { MedicalSupplyService } from '../../services/medicalSupply.service';
import { MedicineService } from '../../services/medicine.service';
import { ImportVoucherService } from '../../services/import.service';
import { Supplier } from '../../models/supplier.model';
import { MedicalSupply } from '../../models/medicalSupply.model';
import { Medicine } from '../../models/medicine.model';
import { ImportVoucher } from '../../models/importVoucher.model';

export class SupplierFacade {
  private supplierService: SupplierService;
  private supplyService: MedicalSupplyService;
  private medicineService: MedicineService;
  private importVoucherService: ImportVoucherService;

  constructor() {
    this.supplierService = new SupplierService();
    this.supplyService = new MedicalSupplyService();
    this.medicineService = new MedicineService();
    this.importVoucherService = new ImportVoucherService();
  }

  // Lấy tất cả nhà cung cấp
  async getAllSuppliers(): Promise<Supplier[]> {
    return await this.supplierService.getAllSuppliers();
  }

  // Tìm kiếm nhà cung cấp theo tên
  async searchSuppliers(name: string): Promise<Supplier[]> {
    return this.supplierService.searchSuppliers(name);
  }

  // Lấy chi tiết 1 nhà cung cấp (kèm supplies, medicines, vouchers)
  async getSupplierDetail(id: number): Promise<{
    supplier: Supplier | null;
    supplies: MedicalSupply[];
    medicines: Medicine[];
    importVouchers: ImportVoucher[];
  }> {
    const supplier = await this.supplierService.getSupplierById(id);
    if (!supplier) return { supplier: null, supplies: [], medicines: [], importVouchers: [] };
    // Nếu bạn muốn tối ưu query thì chỉnh lại ở service
    const supplies = await this.supplyService.getBySupplier(id);
    const medicines = await this.medicineService.getBySupplier(id);
    const importVouchers = await this.importVoucherService.getBySupplier(id);
    return { supplier, supplies, medicines, importVouchers };
  }

  // Thêm mới nhà cung cấp
  async createSupplier(
    data: Partial<Supplier>,
    type: 'Medicine' | 'Equipment'
  ): Promise<Supplier> {
    return this.supplierService.createSupplier(data, type);
  }

  // Cập nhật nhà cung cấp
  async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier> {
    return this.supplierService.updateSupplier(id, data);
  }

  // Xóa nhà cung cấp (có kiểm tra liên kết nếu cần)
  async deleteSupplier(id: number): Promise<void> {
    // Có thể kiểm tra nếu supplier còn liên kết với supplies/medicines/imports thì không cho xóa
    const supplies = await this.supplyService.getBySupplier(id);
    const medicines = await this.medicineService.getBySupplier(id);
    const importVouchers = await this.importVoucherService.getBySupplier(id);

    if (supplies.length > 0 || medicines.length > 0 || importVouchers.length > 0) {
      throw new Error(
        'Cannot delete supplier: still has supplies, medicines or import vouchers linked.'
      );
    }

    return this.supplierService.deleteSupplier(id);
  }

  // Thống kê tổng số vật tư/thuốc nhập vào từ nhà cung cấp này
  async getImportStats(
    supplierId: number,
    startDate?: string,
    endDate?: string
  ): Promise<{
    totalImportVouchers: number;
    totalImportAmount: number;
    detail: ImportVoucher[];
  }> {
    const vouchers = await this.importVoucherService.getBySupplier(supplierId, startDate, endDate);
    const totalImportVouchers = vouchers.length;
    const totalImportAmount = vouchers.reduce(
      (sum, v) => sum + Number(v.totalAmount || 0),
      0
    );
    return {
      totalImportVouchers,
      totalImportAmount,
      detail: vouchers,
    };
  }

  // Lấy danh sách active suppliers (nếu cần)
  async getActiveSuppliers(): Promise<Supplier[]> {
    return this.supplierService.findActiveSuppliers();
  }

  // Tạo nhà cung cấp từ dữ liệu external (nếu dùng adapter)
  async createFromExternalApi(externalData: any, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
    return this.supplierService.createFromExternalApi(externalData, type);
  }
}