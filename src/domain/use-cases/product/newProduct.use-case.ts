import type { NewProductDto } from "@/domain/dtos/product/newProduct.dto";
import type { ProductEntity } from "@/domain/entities/product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface NewProductUseCase{
    execute(newProductDto: NewProductDto): Promise<ProductEntity>;
}

export class NewProduct implements NewProductUseCase{

    constructor(
        private readonly productRepository: ProductRepository
    ){}

    async execute(newProductDto: NewProductDto): Promise<ProductEntity> {
        const productEntity = await this.productRepository.newProduct(newProductDto)
        return productEntity
    }

}