import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string;

  // [ ] Check relationship
  car_id: string;

  // [ ] Check relationship
  user_id: string;

  @CreateDateColumn()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expect_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.end_date = null;
    }
  }
}

export { Rental };
