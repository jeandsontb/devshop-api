import { UserCreateInput } from '../dto/user-create.input';
import { UserUpdateInput } from '../dto/user-update.input';
import { User } from '../entity/user.entity';

export class UserMapper {
  public static toEntity(input: UserCreateInput): User {
    const userEntity = new User();
    userEntity.name = input.name;
    userEntity.email = input.email;
    userEntity.password = input.password;
    userEntity.role = input.role;
    return userEntity;
  }

  public static toUpdateEntity(input: UserUpdateInput): User {
    const userEntity = new User();
    userEntity.id = input.id;
    userEntity.name = input.name;
    userEntity.email = input.email;
    userEntity.password = input.password;
    userEntity.role = input.role;
    return userEntity;
  }
}
