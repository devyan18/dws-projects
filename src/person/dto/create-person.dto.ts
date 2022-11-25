import { IsNotEmpty } from 'class-validator';
import { Person } from '../entities/person.entity';

export class CreatePersonDto implements Person {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  full_name: string;
}
