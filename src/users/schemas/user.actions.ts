import environments from 'src/config/environments';
import { hash } from 'bcrypt';

export async function preSave() {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await hash(this.password, environments().crypt.saltRounds);

  this.password = salt;
}
