import { Inject, Injectable } from "@nestjs/common";
import { LoginUserDto } from "../dtos/LoginUserDto";
import { USERS_REPOSITORY_PORT } from "../../user/user.constants";
import { HASHER_PORT, TOKEN_GENERATOR_PORT } from "../auth.constants";
import { type IUserRepository } from "../../user/repositories/user-repository.interface";
import { type IHasher } from "../ports/hasher.port";
import { type ITokenGenerator } from "../ports/token-generator.port";
import { AuthTokenOutput } from "../dtos/AuthTokenOutput";
import { RpcException } from "@nestjs/microservices";

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
    console.log(data, "data service");
    const { email, password } = data;
    let token: string;

    const userRegistered = await this.userRepository.getUserByEmail(email);

    console.log(userRegistered, "userRegistered");

    if (userRegistered === null) {
      throw new RpcException({ message: "Invalid email or password.", statusCode: 401 });
    }

    const isValidPassword = await this.hasher.compare(password, userRegistered.password);
    console.log(isValidPassword);
    if (!isValidPassword) {
      throw new RpcException({ message: "Invalid email or password.", statusCode: 401 });
    }

    try {
      token = await this.tokenGenerator.generate(userRegistered.userId);
    } catch (e) {
      console.error("Error generating JWT token:", e);
      throw new RpcException({
        message: "Authentication failed due to server error.",
        statusCode: 500,
      });
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
      throw new RpcException({ message: "User already registered.", statusCode: 400 });
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
      throw new RpcException({
        message: "Authentication failed due to server error.",
        statusCode: 500,
      });
    }
    return {
      token,
      ...userRegistered,
    };
  }
}
