"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventorySubject = exports.LowStockEmailObserver = void 0;
class LowStockEmailObserver {
    update(supply) {
        if (supply.stockQuantity < 10) {
            console.log(`Low stock alert: ${supply.name} has ${supply.stockQuantity} units left`);
            // Gửi email hoặc thông báo
        }
    }
}
exports.LowStockEmailObserver = LowStockEmailObserver;
class InventorySubject {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    notifyObservers(supply) {
        this.observers.forEach((observer) => observer.update(supply));
    }
}
exports.InventorySubject = InventorySubject;
