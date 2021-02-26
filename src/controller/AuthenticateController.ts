import User from '../model/User';
import AuthenticateUserService from '../services/authenticate/AuthenticateUserService';
interface Auth {
    token: string,
    user: User
}

interface AuthHeader {
    authHeader: string
}

class AuthenticateController {
    public async authenticate({ authHeader  }: AuthHeader): Promise<Auth> {
        if (!authHeader) {
            throw new Error('Usuário sem autenticação');
        }
        const authService = new AuthenticateUserService();

        const [, headerToken] = authHeader.split(' ');

        const auth = authService.execute({ headerToken })

        return auth;
    }
}

export default AuthenticateController;