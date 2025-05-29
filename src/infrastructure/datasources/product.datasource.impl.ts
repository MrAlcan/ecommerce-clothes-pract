//import { PrismaClient } from '@prisma/client';
import { UserMapper } from "../mappers/user.mapper";
import {prisma} from "@/lib/prisma";
import type { ProductDatasource } from "@/domain/datasources/product.datasource";
import type { NewProductDto } from "@/domain/dtos/product/new-product.dto";
import type { ProductEntity } from "@/domain/entities/product.entity";
import { ProductMapper } from "../mappers/product.mapper";
import type { GetProductsPerPageDto } from "@/domain/dtos/product/get-products-pew-page.dto";
import type { ReserveProductDto } from "@/domain/dtos/product/reserve-product.dto";
import type { ReserveProductEntity } from "@/domain/entities/reserve-product.entity";
import type { AddProductsToOrderDto } from "@/domain/dtos/product/add-products-to-order.dto";
import { ReserveProductMapper } from "../mappers/reserve-product.mapper";
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

    async getAllProducts(): Promise<ProductEntity[]> {
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

    async getProductsPerPage(prodcutPageDto: GetProductsPerPageDto): Promise<ProductEntity[]> {
        
        const { page, perPage, section } = prodcutPageDto;

        try{
            let pageNumber = +page
            let sizePage = +perPage

            let startPage = ( pageNumber - 1) * sizePage

            let products = await prisma.product.findMany({
                skip: startPage,
                take: sizePage
            })

            //console.log('lo que es section: ',section);

            if( section !== null ){

                //console.log('Ingreso al section != null');
                
                products = await prisma.product.findMany({
                    where: {
                        category: section,
                    },
                    skip: startPage,
                    take: sizePage,
                })

                //console.log('Supuestamente hizo la consulta en: ',section);

            }


            const productEntities = ProductMapper.productEntitiesFromArray(products)

            return productEntities

        } catch (error) {
            throw new Error('No se recupero el produtco');

        }

    }

    async reserveProduct(productReservedDto: ReserveProductDto): Promise<ReserveProductEntity> {
        const { amount, productId } = productReservedDto

        const products = await prisma.order.findMany()

        throw new Error('')

    }

    async addProductsToOrder(addProductsToOrderDto: AddProductsToOrderDto): Promise<ReserveProductEntity[]> {
        const { products, userId, totalPrice } = addProductsToOrderDto;
        try{

            const now = new Date();

            const newOrder = await prisma.order.create({
                data: {
                    total_price: totalPrice.toString(),
                    date: now
                }
            });

            const orderId = newOrder.id;


            const productsSelected: any = []

            products.forEach( async product => {
                const { productId, amount, price } = product

                const newProductToOrder = await prisma.productByOrder.create({
                    data: {
                        amount: amount,
                        id_order: orderId,
                        id_product: parseInt(productId),
                        price: price.toString()
                    }
                });

                const productObject = await prisma.product.findFirst({
                    where: {
                        id: parseInt(productId)
                    }
                });

                productsSelected.push({
                    product: productObject,
                    amount: amount
                })

            });

            const reserveProducts = ReserveProductMapper.reserveProductsFromArray(productsSelected);
            return reserveProducts
            
        } catch ( error ) {
            console.log(error);
            throw new Error('No se pudo añadir los productos a la orden')
        }
    }

}