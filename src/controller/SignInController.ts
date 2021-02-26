import SignInService from '../services/signIn/SignInSerivce';
import User from '../model/User';

interface Auth {
    token: string,
    user: User
}

interface Login {
    email: string,
    password: string,
}

class SignInController{
    public async signIn({ email, password }: Login): Promise<Auth> {
        const signInservice = new SignInService();

        const signIn = signInservice.execute({
            email,
            password
        })

        return signIn;
    }
}

export default SignInController;