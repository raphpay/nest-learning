import { Bike } from 'src/bikes/bike.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Bike, (bike) => bike.owner, { nullable: true })
  bike?: Bike;
}
