import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';
import { ProductDatasourceImpl } from '@/infrastructure/datasources/product.datasource.impl';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/product.repository';
import type { ProductEntity } from '@/domain/entities/product.entity';
import { ProductPageDto } from '@/domain/dtos/product/productPage';
import { ProductPage } from '@/domain/use-cases/product/productPage.use-case';


export const getProductPerPage = defineAction({
    accept: 'form',
    input: z.object({
        page: z.string(),
        perPage: z.string(),
    }),
    handler: async ( { page, perPage }, { cookies } ) => {

        const getProductPageDto = ProductPageDto.fromObject({ page, perPage })

        const datasource = new ProductDatasourceImpl()
        console.log("productodatasourecimpl")

        const repository = new ProductRepositoryImpl(datasource)
        console.log("productrepositoryimpl")

        const productEntity: ProductEntity[] = await new ProductPage(repository).execute(getProductPageDto)
        console.log("product")

        console.log(productEntity);

        return productEntity
    },
});

/*export const getProductPerPage = defineAction({
    accept: 'json',
    handler: async ( { page, perPage }, { cookies } ) => {

        const getProductPageDto = ProductPageDto.fromObject({ page, perPage })

        const datasource = new ProductDatasourceImpl()
        console.log("productodatasourecimpl")

        const repository = new ProductRepositoryImpl(datasource)
        console.log("productrepositoryimpl")

        const productEntity: ProductEntity[] = await new ProductPage(repository).execute(getProductPageDto)
        console.log("product")

        console.log(productEntity);

        return productEntity
    },
});*/
