import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { LoginUserDto } from "../dtos/LoginUserDto";
import { USERS_REPOSITORY_PORT } from "../../user/user.constants";
import { HASHER_PORT, TOKEN_GENERATOR_PORT } from "../auth.constants";
import { type IUserRepository } from "../../user/repositories/user-repository.interface";
import { type IHasher } from "../ports/hasher.port";
import { type ITokenGenerator } from "../ports/token-generator.port";
import { AuthTokenOutput } from "../dtos/AuthTokenOutput";

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY_PORT)
    private readonly userRepository: IUserRepository,

    @Inject(HASHER_PORT)
    private readonly hasher: IHasher,

    @Inject(TOKEN_GENERATOR_PORT)
    private readonly tokenGenerator: ITokenGenerator,
  ) {}

  async login(data: LoginUserDto): Promise<AuthTokenOutput> {
    const { email, password } = data;
    let token: string;

    const userRegistered = await this.userRepository.getUserByEmail(email);

    if (!userRegistered) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const isValidPassword = await this.hasher.compare(password, userRegistered.password);

    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    try {
      token = await this.tokenGenerator.generate(userRegistered.userId);
    } catch (e) {
      console.error("Error generating JWT token:", e);
      throw new InternalServerErrorException("Authentication failed due to server error.");
    }

    return {
      token,
      userId: userRegistered.userId,
      email: userRegistered.email,
    };
  }

  async register(data: LoginUserDto): Promise<AuthTokenOutput> {
    const { email, password } = data;
    let token: string;

    const isRegisteredUser = await this.userRepository.getUserByEmail(email);

    if (isRegisteredUser) {
      throw new ConflictException("This user already exists.");
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = {
      email,
      password: hashedPassword,
    };

    const userRegistered = await this.userRepository.registerUser(user);

    try {
      token = await this.tokenGenerator.generate(userRegistered.userId);
    } catch (e) {
      console.error("Error generating JWT token:", e);
      throw new InternalServerErrorException("Authentication failed due to server error.");
    }

    return {
      token,
      ...userRegistered,
    };
  }
}
