import { UserEntity } from "@/domain/entities/user.entity";

export class UserMapper{

    static userEntityFromObject(object: {[key: string]: any}){
        const { id, name, email } = object;

        /*console.log('--------- OBJETOD E MAPEPR ----------')
        console.log(object);*/

        //validaciones
        if (!id) throw new Error('Se esperaba un Id');
        if (!name) throw new Error('Se esperaba un Name');
        if (!email) throw new Error('Se esperaba un Email');

        return new UserEntity(id, name, email);
    }
}