export class GetUserDto {

    constructor(
        public userId: string,
    ){}

    static fromObject(object: {[key: string]: any}){
        const { userId } = object;
        if( !userId )throw new Error('Se esperaba un id de usuario');

        return new GetUserDto(userId);
    }

}