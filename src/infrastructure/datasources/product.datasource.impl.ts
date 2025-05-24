//import { PrismaClient } from '@prisma/client';
import { UserMapper } from "../mappers/user.mapper";
import {prisma} from "@/lib/prisma";
import type { ProductDatasource } from "@/domain/datasources/product.datasource";
import type { NewProductDto } from "@/domain/dtos/product/newProduct.dto";
import type { ProductEntity } from "@/domain/entities/product.entity";
import { ProductMapper } from "../mappers/product.mapper";
import type { ProductDto } from "@/domain/dtos/product/product.dto";
import type { ProductPageDto } from "@/domain/dtos/product/productPage";
//import type prisma from "@/lib/prisma";

export class ProductDatasourceImpl implements ProductDatasource {

    async newProduct(newProductDto: NewProductDto): Promise<ProductEntity> {
        const { name, price, category, color } = newProductDto
        
        try {
            const productNew = await prisma.product.create({
                data: {
                    name: name,
                    price: price,
                    category: category,
                    color: color
                }
            });
            

            const productEntity = ProductMapper.productEntityFromObject(productNew)


            return productEntity;
        } catch (error) {
            console.log(error);

            throw new Error('algo salió mal');
        }

    }

    async product(productDto: ProductDto): Promise<ProductEntity[]> {
        //const { } = productDto

        try {
            const productGet = await prisma.product.findMany();

            //console.log(productGet);
            
            //const productEntity = ProductMapper.productEntityFromObject(productGet);
            const productEntity = ProductMapper.productEntitiesFromArray(productGet);
            //console.log(productEntity);
            return productEntity;
        } catch (error) {
            console.log(error);
            
            throw new Error('No se recupero el produtco');
        }
    }

    async productPage(prodcutPageDto: ProductPageDto): Promise<ProductEntity[]> {
        
        const { page, perPage } = prodcutPageDto;

        try{
            let pageNumber = +page
            let sizePage = +perPage

            let startPage = ( pageNumber - 1) * sizePage

            const products = await prisma.product.findMany({
                skip: startPage,
                take: sizePage
            })

            const productEntities = ProductMapper.productEntitiesFromArray(products)

            return productEntities

        } catch (error) {
            throw new Error('No se recupero el produtco');

        }

    }

}