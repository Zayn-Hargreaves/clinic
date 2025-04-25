import { NotFoundException } from '../utils/exceptions';

export class BaseRepository<T> {
    constructor(private entity: any) { }

    async findAll(): Promise<T[]> {
        return this.entity.find();
    }

    async findById(id: number): Promise<T | undefined> {
        return this.entity.findOne(id);
    }

    async create(data: any): Promise<T> {
        const newEntity = this.entity.create(data);
        return this.entity.save(newEntity);
    }

    async update(id: number, data: any): Promise<T> {
        await this.entity.update(id, data);
        const updatedEntity = await this.findById(id);
        if (!updatedEntity) {
            throw new NotFoundException('Resource not found after update');
        }
        return updatedEntity;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.entity.delete(id);
        return result.affected > 0;
    }
}