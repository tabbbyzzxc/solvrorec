import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';

@Injectable()
export class CocktailsService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateCocktailDto) {
        const created = await this.prisma.cocktail.create({
            data: {
                name: dto.name,
                category: dto.category,
                instructions: dto.instructions,
                ingredients: {
                    create: dto.ingredients?.map(i => ({
                        ingredient: { connect: { id: i.ingredientId } },
                        amount: i.amount
                    }))
                }
            },
            include: { ingredients: { include: { ingredient: true } } }
        });
        return created;
    }
    async findOne(id: number) {
        const c = await this.prisma.cocktail.findUnique({
            where: { id },
            include: { ingredients: { include: { ingredient: true } } }
        });
        if (!c) throw new NotFoundException('Cocktail not found');
        return c;
    }

    async update(id: number, dto: UpdateCocktailDto) {
        const updated = await this.prisma.$transaction(async (prisma) => {
            await prisma.cocktailIngredient.deleteMany({ where: { cocktailId: id } });
            const c = await prisma.cocktail.update({
                where: { id },
                data: {
                    name: dto.name,
                    category: dto.category,
                    instructions: dto.instructions,
                    ingredients: {
                        create: dto.ingredients?.map(i => ({
                            ingredient: { connect: { id: i.ingredientId } },
                            amount: i.amount
                        }))
                    }
                },
                include: { ingredients: { include: { ingredient: true } } }
            });
            return c;
        });
        return updated;
    }

    async remove(id: number) {
        await this.prisma.cocktail.delete({ where: { id } });
        return { deleted: true };
    }
}
