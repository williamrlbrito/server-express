import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list then providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'user1',
      email: 'user1@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'user2',
      email: 'user2@example.com',
      password: '123456',
    });

    const user3 = await fakeUsersRepository.create({
      name: 'user3',
      email: 'user3@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: user3.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
