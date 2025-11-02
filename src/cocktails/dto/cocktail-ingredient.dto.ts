import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CocktailIngredientDto {
    @ApiProperty()
    @IsInt()
    ingredientId: number;

    @ApiProperty()
    @IsString()
    amount: string;
}
