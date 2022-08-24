import { UserCreateInput } from '../dto/user-create.input';
import { User } from '../entity/user.entity';

export class UserMapper {
  public static toEntity(input: UserCreateInput): User {
    const userEntity = new User();
    userEntity.name = input.name;
    userEntity.email = input.email;
    userEntity.role = input.role;
    return userEntity;
  }
}
