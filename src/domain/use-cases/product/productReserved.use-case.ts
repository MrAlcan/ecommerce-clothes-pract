import type { ProductReservedDto } from "@/domain/dtos/product/productReserved.dto";
import type { ProductReservedEntity } from "@/domain/entities/productReserver.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface ProductReservedUseCase{
    execute(productReservedDto: ProductReservedDto): Promise<ProductReservedEntity>
}

export class ProductReserved implements ProductReservedUseCase{

    constructor(
        private readonly productRepository: ProductRepository,
    ){}

    async execute(productReservedDto: ProductReservedDto): Promise<ProductReservedEntity>{
        const productReservedEntity = await this.productRepository.productReserved(productReservedDto)
        return productReservedEntity
    }

}