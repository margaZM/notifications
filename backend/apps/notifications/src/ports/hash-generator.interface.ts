export interface HashGenerator {
  generate(data: Record<string, any>): string;
}
