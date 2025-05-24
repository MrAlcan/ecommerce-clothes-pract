import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';
import { ProductDatasourceImpl } from '@/infrastructure/datasources/product.datasource.impl';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/product.repository';
import type { ProductEntity } from '@/domain/entities/product.entity';
import { Product } from '@/domain/use-cases/product/product.use-case';
import { ProductDto } from '@/domain/dtos/product/product.dto';


export const getProduct = defineAction({
    accept: 'json',
    handler: async () => {

        console.log("ingreso a la action");

        const getProductDto = ProductDto.fromObject({})
        console.log("regerso de productdto")

        const datasource = new ProductDatasourceImpl()
        console.log("productodatasourecimpl")

        const repository = new ProductRepositoryImpl(datasource)
        console.log("productrepositoryimpl")

        const productEntity: ProductEntity[] = await new Product(repository).execute(getProductDto)
        console.log("product")

        console.log(productEntity);

        return productEntity
    },
});
