import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../../model/User';

interface Request {
    headerToken: string;
}

interface Response {
    token: string,
    user: User
}

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string
}

class AuthenticateUserService {
    public async execute({ headerToken }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        try {
            const decoded = verify(headerToken, authConfig.jwt.secret);

            const { sub } = decoded as TokenPayload;

            const user = await usersRepository.findOne({
                where: {
                    id: sub
                }
            });

            if (!user) {
                throw Error('Usuário incorreto');
            }

            const token = headerToken;

            return {
                token,
                user
            }

        } catch (error) {
            throw new Error('JWT invalido')
        }
    }
}

export default AuthenticateUserService;