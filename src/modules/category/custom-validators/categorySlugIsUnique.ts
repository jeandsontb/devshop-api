import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryService } from '../category.service';

@ValidatorConstraint({
  name: 'categorySlugIsUnique',
  async: true,
})
export class CategorySlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(
    text: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const idUpdated = validationArguments.object['id'];
    const category = await this.categoryService.findBySlug(text);

    if (category) {
      if (idUpdated && idUpdated === category.id) {
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
