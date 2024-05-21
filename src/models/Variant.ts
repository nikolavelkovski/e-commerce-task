import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Variant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    cascade: true,
    onDelete: "CASCADE",
  })
  product: Product;
}
