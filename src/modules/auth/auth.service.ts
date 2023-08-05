// profile.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) // Inject the Repository for the User entity
        private AuthRepository: Repository<User>,
    ) { }

    // Use AuthRepository for database operations
}