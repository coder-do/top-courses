import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { genSalt, hash, compare } from 'bcryptjs';
import {
    UNAUTHORIZED_USER_ERROR,
    WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
        private readonly jwtService: JwtService,
    ) { }

    async createUser(dto: AuthDto) {
        const salt = await genSalt(10);
        const newUser = this.userModel.create({
            email: dto.login,
            passwordHash: await hash(dto.password, salt),
        });
        return (await newUser).save();
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<Pick<UserModel, 'email'>> {
        const user = await this.findUser(email);
        if (!user) {
            throw new UnauthorizedException(UNAUTHORIZED_USER_ERROR);
        }
        const checkPassword = await compare(password, user.passwordHash);
        if (!checkPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        return { email: user.email };
    }

    async login(email: string) {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
