import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CocktailIngredientDto } from './cocktail-ingredient.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCocktailDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsString()
    instructions: string;

    @ApiProperty({ type: () => CocktailIngredientDto, isArray: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CocktailIngredientDto)
    ingredients: CocktailIngredientDto[];

}