import type { AddProductsToOrderDto } from "@/domain/dtos/product/add-products-to-order.dto";
import type { ReserveProductEntity } from "@/domain/entities/reserve-product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface AddProductsToOrderUseCase {
    execute(addProductsToOrderDto: AddProductsToOrderDto): Promise<ReserveProductEntity[]>
}

export class AddProductsToOrder implements AddProductsToOrderUseCase{
    
    constructor(
        private readonly productRepository: ProductRepository,
    ){}

    async execute(addProductsToOrderDto: AddProductsToOrderDto): Promise<ReserveProductEntity[]> {
        const reserveProducts = await this.productRepository.addProductsToOrder(addProductsToOrderDto)
        return reserveProducts
    }



}