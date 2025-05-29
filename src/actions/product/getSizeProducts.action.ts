import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';
import { ProductDatasourceImpl } from '@/infrastructure/datasources/product.datasource.impl';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/product.repository';
import type { ProductEntity } from '@/domain/entities/product.entity';
import { GetAllProducts } from '@/domain/use-cases/product/get-all-products.use-case';


export const getSizeProducts = defineAction({
    accept: 'json',
    handler: async () => {

        console.log("ingreso a la action");

        const datasource = new ProductDatasourceImpl()
        console.log("productodatasourecimpl")

        const repository = new ProductRepositoryImpl(datasource)
        console.log("productrepositoryimpl")

        const productEntity: ProductEntity[] = await new GetAllProducts(repository).execute()
        console.log("product")

        const numberPages = Math.ceil( productEntity.length / 5 )

        return numberPages
    },
});