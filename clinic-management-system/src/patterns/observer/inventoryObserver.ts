import { MedicalSupply } from '../../models/medicalSupply.model';

export interface InventoryObserver {
  update(supply: MedicalSupply): void;
}

export class LowStockEmailObserver implements InventoryObserver {
  update(supply: MedicalSupply): void {
    if (supply.stockQuantity < 10) {
      console.log(`Low stock alert: ${supply.name} has ${supply.stockQuantity} units left`);
      // Gửi email hoặc thông báo
    }
  }
}

export class InventorySubject {
  private observers: InventoryObserver[] = [];

  addObserver(observer: InventoryObserver) {
    this.observers.push(observer);
  }

  notifyObservers(supply: MedicalSupply) {
    this.observers.forEach((observer) => observer.update(supply));
  }
}

