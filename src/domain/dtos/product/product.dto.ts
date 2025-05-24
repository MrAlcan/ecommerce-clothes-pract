export class ProductDto{

    private constructor(

    ){}

    static fromObject(object: {[key: string]: any}){
        return new ProductDto();
    }

}