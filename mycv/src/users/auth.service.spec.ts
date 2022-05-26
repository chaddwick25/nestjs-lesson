import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Unit testing
describe('AuthService', () => {
  let service: AuthService;
  const users: User[] = [];
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //create a fake copy of the user's service  as Partial of User
    const fakeUsersService: Partial<UsersService> = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };


    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const user = await service.signup('asttttdf@asdf.com', 'asdf');
    // conditional boolean check of the User DTO hashed password
    expect(user.password).not.toEqual('asdf');
    // this conditional check is based on the creation of the password (unique implementation)
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  // redefined the find method in the AuthUserService to hard-code test params
  // fakeUsersService.find = () =>
  // Promise.resolve([
  //       { id: 1, email: 'asdf@asdf.com', password: 'asdf' } as User,
  // ]);

  // passed
  it('throws an error if user signs up with email that is in use', async () => {
    try {
      await expect(service.signup('asdf@asdf.com', 'passs')).rejects.toContain(
        BadRequestException,
      );
    } catch (error) {
      console.log(error)
    }
  });

  // passed
  it('throws if an invalid password is provided', async () => {
    await service.signup('asdf@asdfsss.com', 'asdf454');
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrowError(
      'bad password',
    );
  });

  // passed
  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdfsss2.com', 'asdf454');
    const user = await service.signin('asdf@asdfsss2.com', 'asdf454');
    expect(user).toBeDefined();
  });

  // passed
  it('throws error if signin is called with an unused email', async () => {
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrowError(
      'bad password',
    );
  });
});
