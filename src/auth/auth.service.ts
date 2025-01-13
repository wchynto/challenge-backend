import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signupDto: SignUpDto) {
    const { name, email, password } = signupDto;
    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    const cratedUser = await this.userRepository.save(user);

    const token = await this.jwtService.signAsync(
      { UUID: cratedUser.UUID },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES'),
      },
    );

    return { token };
  }

  async signIn(signinDto: SignInDto) {
    const { email, password } = signinDto;
    const user = await this.userRepository.findOneByOrFail({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = await this.jwtService.signAsync(
      { UUID: user.UUID },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES'),
      },
    );

    return { token };
  }
}
