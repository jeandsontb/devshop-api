import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ order: { id: 'DESC' } });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ email }] });
  }

  async create(input: User): Promise<User> {
    return this.userRepository.save(input);
  }

  async update(input: User): Promise<User> {
    const entity = await this.userRepository.findOne({
      where: { id: input.id },
    });

    entity.name = input.name;
    entity.email = input.email;
    entity.password = input.password;
    entity.role = input.role;

    await this.userRepository.save(entity);
    return input;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (err) {
      return false;
    }
  }
}
