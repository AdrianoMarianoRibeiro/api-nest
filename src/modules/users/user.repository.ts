import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Person) private userRepository: Repository<Person>,
  ) {}

  async findById(ni: string): Promise<Person> {
    const user = await this.userRepository.findOne({ where: { ni } });

    return user;
  }
}
