import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repos';

export async function assertUser(
  oktaId,
  email = '',
  firstName = '',
  lastName = '',
  birthday = '',
  username = '',
) {
  const userRepo = getCustomRepository(UserRepository);
  const existingUser = await userRepo.findOne({
    where: { oktaId },
  });
  if (existingUser) {
    return existingUser;
  }

  return userRepo.createAndSave(
    oktaId,
    email,
    firstName,
    lastName,
    birthday,
    username,
  );
}
