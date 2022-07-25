import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductService } from '../product.service';

@ValidatorConstraint({
  name: 'productSlugIsUnique',
  async: true,
})
export class ProductSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {}

  async validate(
    text: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const idUpdated = validationArguments.object['id'];
    const product = await this.productService.findBySlug(text);

    if (product) {
      if (idUpdated && idUpdated === product.id) {
        return true;
      }
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return 'Já existe um slug cadastrado no sistema';
  }
}
