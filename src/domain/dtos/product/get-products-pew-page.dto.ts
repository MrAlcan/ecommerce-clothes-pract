export class GetProductsPerPageDto{

    private constructor(
        public page: string,
        public perPage: string,
        public section: string,
    ){}

    static fromObject(object: {[key: string]: any}){
        const { page, perPage, sectionSend } = object;
        if(!page) throw new Error('Se esperaba un numero de Pagina');
        if(!perPage) throw new Error('Se esperaba un numero de productos');

        let section = sectionSend;

        //console.log(`section que llega al DTO: ${section}`)
        


        if ( !sectionSend ){
            section = null
        }

        //console.log(`section que se va del DTO: ${section}`)

        
        return new GetProductsPerPageDto( page, perPage, section );
    }

}