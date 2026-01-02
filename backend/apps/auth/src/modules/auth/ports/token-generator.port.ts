export interface ITokenGenerator {
    generate(userId: string): Promise<string>;
    verify(token: string): Promise<object>;
}