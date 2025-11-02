import { Controller, Get, Post, Param, Body, Query, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('cocktails')
export class CocktailsController {
    constructor(private svc: CocktailsService) {}

    @Post()
    @ApiBody({type: CreateCocktailDto})
    create(@Body() dto: CreateCocktailDto) {
        return this.svc.create(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.svc.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCocktailDto) {
        return this.svc.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.svc.remove(id);
    }
}