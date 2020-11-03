import { getManager } from 'typeorm';
import { User as Test } from '../entity/User';

export async function assertUser(oktaUserId: string) {
  const manager = getManager();
  const existingUser = await manager.findOne(Test, {
    where: { oktaUserId },
  });
  if (existingUser) {
    return existingUser;
  }

  const user = new Test();
  user.oktaId = oktaUserId;
  return await manager.save(user);
}
