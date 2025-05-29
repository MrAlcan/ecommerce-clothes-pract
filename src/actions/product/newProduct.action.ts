import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';
import { NewProductDto } from '@/domain/dtos/product/new-product.dto';
import { ProductDatasourceImpl } from '@/infrastructure/datasources/product.datasource.impl';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/product.repository';
import type { ProductEntity } from '@/domain/entities/product.entity';
import { NewProduct } from '@/domain/use-cases/product/new-product.use-case';

export const newProduct = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(5),
        price: z.string(),
        category: z.string().min(5),
        color: z.string().min(4),
    }),
    handler: async ({ name, price, category, color}, { cookies}) => {
        const newProductDto = NewProductDto.fromObject({ name, price, category, color})

        const datasource = new ProductDatasourceImpl()

        const repository = new ProductRepositoryImpl(datasource)

        const productEntity: ProductEntity = await new NewProduct(repository).execute(newProductDto)

        return productEntity
    },
});
