import type { GetProductsPerPageDto } from "@/domain/dtos/product/get-products-pew-page.dto";
import type { ProductEntity } from "@/domain/entities/product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface ProductPageUseCase{
    execute(productPageDto: GetProductsPerPageDto): Promise<ProductEntity[]>;
}

export class ProductPage implements ProductPageUseCase{

    constructor(
        private readonly productRepository: ProductRepository
    ){}

    async execute(productPageDto: GetProductsPerPageDto): Promise<ProductEntity[]> {
        const productEntity = await this.productRepository.getProductsPerPage(productPageDto)
        return productEntity
    }

}