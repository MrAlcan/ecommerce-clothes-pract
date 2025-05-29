import type { ProductDatasource } from "@/domain/datasources/product.datasource";
import type { NewProductDto } from "@/domain/dtos/product/new-product.dto";
import type { GetProductsPerPageDto } from "@/domain/dtos/product/get-products-pew-page.dto";
import type { ProductEntity } from "@/domain/entities/product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";
import type { ReserveProductDto } from "@/domain/dtos/product/reserve-product.dto";
import type { ReserveProductEntity } from "@/domain/entities/reserve-product.entity";
import type { AddProductsToOrderDto } from "@/domain/dtos/product/add-products-to-order.dto";

export class ProductRepositoryImpl implements ProductRepository{
    
    constructor(
        private readonly productDatasource: ProductDatasource
    ){}

    newProduct(newProductDto: NewProductDto): Promise<ProductEntity> {
        return this.productDatasource.newProduct(newProductDto)
    }

    getAllProducts(): Promise<ProductEntity[]> {
        return this.productDatasource.getAllProducts()
    }

    getProductsPerPage(productPageDto: GetProductsPerPageDto): Promise<ProductEntity[]>{
        return this.productDatasource.getProductsPerPage(productPageDto)
    }

    reserveProduct(productReservedDto: ReserveProductDto): Promise<ReserveProductEntity> {
        return this.productDatasource.reserveProduct(productReservedDto)
    }

    addProductsToOrder(addProductsToOrderDto: AddProductsToOrderDto): Promise<ReserveProductEntity[]> {
        return this.productDatasource.addProductsToOrder(addProductsToOrderDto);
    }

}