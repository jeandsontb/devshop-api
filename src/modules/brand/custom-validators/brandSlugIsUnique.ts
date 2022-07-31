import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BrandService } from '../brand.service';

@ValidatorConstraint({
  name: 'categorySlugIsUnique',
  async: true,
})
export class BrandSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly brandService: BrandService) {}

  async validate(
    text: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const idUpdated = validationArguments.object['id'];
    const brand = await this.brandService.findBySlug(text);

    if (brand) {
      if (idUpdated && idUpdated === brand.id) {
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
