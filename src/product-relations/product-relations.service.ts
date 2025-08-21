import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductRelationDto } from "./dto/create-product-relation.dto";
import { UpdateProductRelationDto } from "./dto/update-product-relation.dto";

@Injectable()
export class ProductRelationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductRelationDto: CreateProductRelationDto) {
    const { productId, relatedProductId } = createProductRelationDto;

    // Check if products exist
    const [product, relatedProduct] = await Promise.all([
      this.prisma.product.findUnique({ where: { id: productId } }),
      this.prisma.product.findUnique({ where: { id: relatedProductId } }),
    ]);

    if (!product || !relatedProduct) {
      throw new BadRequestException("One or both products do not exist");
    }

    // Check if relation already exists
    const existingRelation = await this.prisma.productRelation.findUnique({
      where: {
        productId_relatedProductId: {
          productId,
          relatedProductId,
        },
      },
    });

    if (existingRelation) {
      throw new BadRequestException("Product relation already exists");
    }

    return this.prisma.productRelation.create({
      data: createProductRelationDto,
      include: {
        product: true,
        relatedProduct: true,
      },
    });
  }

  async findAll() {
    return this.prisma.productRelation.findMany({
      include: {
        product: true,
        relatedProduct: true,
      },
    });
  }

  async findOne(id: number) {
    const productRelation = await this.prisma.productRelation.findUnique({
      where: { id },
      include: {
        product: true,
        relatedProduct: true,
      },
    });

    if (!productRelation) {
      throw new NotFoundException(`Product relation with ID ${id} not found`);
    }

    return productRelation;
  }

  async findByProductId(productId: number) {
    return this.prisma.productRelation.findMany({
      where: { productId },
      include: {
        product: true,
        relatedProduct: true,
      },
    });
  }

  async findByTag(tag: string) {
    return this.prisma.productRelation.findMany({
      where: { tag },
      include: {
        product: true,
        relatedProduct: true,
      },
    });
  }

  async update(id: number, updateProductRelationDto: UpdateProductRelationDto) {
    try {
      return await this.prisma.productRelation.update({
        where: { id },
        data: updateProductRelationDto,
        include: {
          product: true,
          relatedProduct: true,
        },
      });
    } catch {
      throw new NotFoundException(`Product relation with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.productRelation.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch {
      throw new NotFoundException(`Product relation with ID ${id} not found`);
    }
  }
}
