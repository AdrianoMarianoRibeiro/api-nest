import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'A descrição deve ter no máximo 100 caracteres' })
  readonly description: string;
}
