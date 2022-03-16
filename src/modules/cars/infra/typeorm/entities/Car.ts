import {
  Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from './Category';

@Entity('cars')
class Car {
  @PrimaryColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    daily_rate: number;

  @Column()
    available: boolean;

  @Column()
    license_plate: string;

  @Column()
    fine_amount: number;

  @Column()
    brand: string;

  @CreateDateColumn()
    created_at: Date;

  // many to one relationship.
  // many cars to an single category
  @JoinColumn({ name: 'category_id' })
    category: Category;

  @Column()
    category_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export { Car };
