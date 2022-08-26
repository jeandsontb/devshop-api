import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from './dto/auth';
import { AuthUserInput } from './dto/auth-user.input';
import { UserPublic } from './dto/user';
import { UserCreateInput } from './dto/user-create.input';
import { UserUpdateInput } from './dto/user-update.input';
import { UserMapper } from './mapper/user.mapper';
import { UserService } from './user.service';

@Resolver((of) => UserPublic)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Query((returns) => [UserPublic], { name: 'getAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return this.userService.findAll();
  }

  @Query((returns) => UserPublic, { name: 'getUserById' })
  async getUserById(@Args('id') id: string): Promise<UserPublic> {
    return this.userService.findById(id);
  }

  @Query((returns) => UserPublic, { name: 'getUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserPublic> {
    return this.userService.findByEmail(email);
  }

  @Mutation((returns) => UserPublic, { name: 'UserCreateInput' })
  async createUser(@Args('input') input: UserCreateInput): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input));
  }

  @Mutation((returns) => UserPublic, { name: 'updateUser' })
  async updateUser(@Args('input') input: UserUpdateInput): Promise<UserPublic> {
    return this.userService.update(UserMapper.toUpdateEntity(input));
  }

  @Mutation((returns) => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input);
  }

  @Mutation((returns) => AuthToken, { name: 'auth' })
  async auth(@Args('input') input: AuthUserInput): Promise<AuthToken> {
    const user = await this.userService.auth(input.email, input.password);
    if (user) {
      const authToken = new AuthToken();
      authToken.refreshToken = this.jwtService.sign({
        scope: ['refreshToken'],
        id: user.id,
      });

      authToken.accessToken = this.jwtService.sign({
        scope: ['accessToken', user.role],
        id: user.id,
      });

      return authToken;
    }

    return null;
  }
}
