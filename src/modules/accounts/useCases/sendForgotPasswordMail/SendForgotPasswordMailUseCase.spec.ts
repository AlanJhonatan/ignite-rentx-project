import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Password Mail Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProviderInMemory
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'Mildred Dixon',
      email: 'femdoska@nuri.ga',
      password: '1234',
      driver_license: '150290320',
    });

    await sendForgotPasswordMailUseCase.execute('femdoska@nuri.ga');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('nonexistent@mail.com')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create a users token', async () => {
    const create = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'Mildred Dixon',
      email: 'femdoska@nuri.ga',
      password: '1234',
      driver_license: '150290320',
    });

    await sendForgotPasswordMailUseCase.execute('femdoska@nuri.ga');

    expect(create).toHaveBeenCalled();
  });
});
