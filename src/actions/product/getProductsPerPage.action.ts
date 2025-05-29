import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';
import { ProductDatasourceImpl } from '@/infrastructure/datasources/product.datasource.impl';
import { ProductRepositoryImpl } from '@/infrastructure/repositories/product.repository';
import type { ProductEntity } from '@/domain/entities/product.entity';
import { GetProductsPerPageDto } from '@/domain/dtos/product/get-products-pew-page.dto';
import { ProductPage } from '@/domain/use-cases/product/get-products-per-page.use-case';


export const getProductPerPage = defineAction({
    accept: 'form',
    input: z.object({
        page: z.string(),
        perPage: z.string(),
        section: z.string().optional(),
    }),
    handler: async ( { page, perPage, section }, { cookies } ) => {

        //console.log(`Section que llega a la action: ${section}`)

        let sectionSend = null;
        if ( section !== undefined || section!==null ){
            sectionSend = "Hombres";
            if ( section == "women" ){
                sectionSend = "Mujeres";
            }
            if ( section == "kids" ){
                sectionSend = "Niños";
            }
        }

        //console.log(`Section que llega se va de la action: ${sectionSend}`)

        //let getProductPageDto;
        let getProductPageDto = GetProductsPerPageDto.fromObject({ page, perPage, sectionSend})

        /*if ( section !== undefined || section!==null ){

            console.log('ingreso significa que no es null o undefined')

            let sectionSend = 'Hombres';
            if ( section == "women" ) sectionSend = "Mujeres";
            if ( section == "kids" ) sectionSend = "Niños";

            console.log('section send que se envia de la action ', sectionSend)

            getProductPageDto = GetProductsPerPageDto.fromObject({ page, perPage, sectionSend })

            console.log(`DTO QUE SE CERA EN LA ACTION ${getProductPageDto}`)
        }*/


        const datasource = new ProductDatasourceImpl()
        //console.log("productodatasourecimpl")

        const repository = new ProductRepositoryImpl(datasource)
        //console.log("productrepositoryimpl")

        const productEntity: ProductEntity[] = await new ProductPage(repository).execute(getProductPageDto)
        //console.log("product")

        //console.log(productEntity);

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
