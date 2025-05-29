import type { NewProductDto } from "../dtos/product/new-product.dto";
import type { GetProductsPerPageDto } from "../dtos/product/get-products-pew-page.dto";
import type { ReserveProductDto } from "../dtos/product/reserve-product.dto";
import type { ProductEntity } from "../entities/product.entity";
import type { ReserveProductEntity } from "../entities/reserve-product.entity";
import type { AddProductsToOrderDto } from "../dtos/product/add-products-to-order.dto";

export abstract class ProductDatasource{

    abstract newProduct(newProductDto: NewProductDto): Promise<ProductEntity>;
    abstract getAllProducts(): Promise<ProductEntity[]>;
    abstract getProductsPerPage(prodcutPageDto: GetProductsPerPageDto): Promise<ProductEntity[]>;
    abstract reserveProduct(productReservedDto: ReserveProductDto): Promise<ReserveProductEntity>
    abstract addProductsToOrder(addProductsToOrderDto: AddProductsToOrderDto): Promise<ReserveProductEntity[]>

}