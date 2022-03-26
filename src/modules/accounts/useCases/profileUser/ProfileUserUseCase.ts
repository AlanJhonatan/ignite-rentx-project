import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<User> {
    const userProfile = await this.usersRepository.findById(user_id);

    return userProfile;
  }
}

export { ProfileUserUseCase };
