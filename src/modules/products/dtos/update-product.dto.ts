import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly category: number;
}
