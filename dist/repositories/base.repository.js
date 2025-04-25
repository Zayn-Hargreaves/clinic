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
exports.BaseRepository = void 0;
const exceptions_1 = require("../utils/exceptions");
class BaseRepository {
    constructor(entity) {
        this.entity = entity;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.entity.find();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.entity.findOne(id);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEntity = this.entity.create(data);
            return this.entity.save(newEntity);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.update(id, data);
            const updatedEntity = yield this.findById(id);
            if (!updatedEntity) {
                throw new exceptions_1.NotFoundException('Resource not found after update');
            }
            return updatedEntity;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.entity.delete(id);
            return result.affected > 0;
        });
    }
}
exports.BaseRepository = BaseRepository;
