import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }
  findById(id: string) {
    return this.findOne({ id });
  }
  findByUsername(username: string) {
    return this.findOne({ username });
  }
  findByOktaId(oktaId: string) {
    return this.findOne({ oktaId });
  }
  createAndSave(
    oktaId: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: string,
    username: string,
  ) {
    const user = new User();
    user.oktaId = oktaId;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthdate = birthday;
    user.username = username;
    return this.manager.save(user);
  }
}
