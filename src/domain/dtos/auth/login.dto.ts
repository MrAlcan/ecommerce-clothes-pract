export class LoginDto{

    private constructor(
        public email: string,
        public password: string,
    ){}

    static fromObject(object: {[key: string]: any}){
        const { email, password } = object;

        //validaciones

        if (!email) throw new Error('Se esperaba un Email');
        if (!password) throw new Error('Se esperaba una Contraseña');

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|email\.com)$/;
        if (!emailRegex.test(email)) throw new Error('El Email debe ser válido y pertenecer a @gmail.com, @hotmail.com o @email.com');
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) throw new Error('La Contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número');


        

        return new LoginDto(email, password);
    }
}