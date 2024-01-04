// update-category.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'A descrição deve ter no máximo 100 caracteres' })
  readonly description?: string;
}
