import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/utils/jwt-auth.guard';
import { AuthUserId } from 'src/utils/jwt-user.decorator';
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

  @UseGuards(AuthGuard)
  @Query((returns) => [UserPublic], { name: 'getAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UserPublic, { name: 'getUserById' })
  async getUserById(@Args('id') id: string): Promise<UserPublic> {
    return this.userService.findById(id);
  }

  @Query((returns) => UserPublic, { name: 'getUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserPublic> {
    return this.userService.findByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => UserPublic, { name: 'UserCreateInput' })
  async createUser(@Args('input') input: UserCreateInput): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input));
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => UserPublic, { name: 'updateUser' })
  async updateUser(@Args('input') input: UserUpdateInput): Promise<UserPublic> {
    return this.userService.update(UserMapper.toUpdateEntity(input));
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }

  @Mutation((returns) => AuthToken, { name: 'auth' })
  async auth(@Args('input') input: AuthUserInput): Promise<AuthToken> {
    const [user, refreshToken] = await this.userService.auth(
      input.email,
      input.password,
    );
    if (user) {
      const authToken = new AuthToken();
      authToken.refreshToken = this.jwtService.sign(
        {
          scope: ['refreshToken'],
          id: refreshToken.id,
        },
        {
          expiresIn: '8 hours',
        },
      );

      authToken.accessToken = this.jwtService.sign(
        {
          scope: ['accessToken', user.role],
          id: user.id,
        },
        {
          expiresIn: '1 hour',
        },
      );

      return authToken;
    }

    throw new Error('Bad credentials');
  }

  @Mutation((returns) => String, { name: 'accessToken' })
  async accessToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<string> {
    const decoded = this.jwtService.verify(refreshToken);
    if (decoded && decoded.scope.indexOf('refreshToken') >= 0) {
      const authToken = await this.userService.getRefreshToken(decoded.id);
      const accessToken = this.jwtService.sign(
        {
          scope: ['accessToken', authToken.user.role],
          id: authToken.user.id,
        },
        {
          expiresIn: '1 hour',
        },
      );
      return accessToken;
    }

    return null;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UserPublic, { name: 'getMe' })
  async getMe(@AuthUserId() id: string): Promise<UserPublic> {
    return this.userService.findById(id);
  }
}
