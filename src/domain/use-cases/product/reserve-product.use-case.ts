import type { ReserveProductDto } from "@/domain/dtos/product/reserve-product.dto";
import type { ReserveProductEntity } from "@/domain/entities/reserve-product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface ReserveProductUseCase{
    execute(productReservedDto: ReserveProductDto): Promise<ReserveProductEntity>
}

export class ReserveProduct implements ReserveProductUseCase{

    constructor(
        private readonly productRepository: ProductRepository,
    ){}

    async execute(productReservedDto: ReserveProductDto): Promise<ReserveProductEntity>{
        const productReservedEntity = await this.productRepository.reserveProduct(productReservedDto)
        return productReservedEntity
    }

}