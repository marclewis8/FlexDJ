import { getManager } from 'typeorm';
import { User } from '../entity/User';

export async function assertUser(
  oktaId,
  email = '',
  firstName = '',
  lastName = '',
  birthday = '',
) {
  const manager = getManager();
  const existingUser = await manager.findOne(User, {
    where: { oktaId },
  });
  if (existingUser) {
    return existingUser;
  }

  const user = new User();
  user.oktaId = oktaId;
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.birthdate = birthday;
  return await manager.save(user);
}
