import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Variant } from "./Variant";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("int")
  inventory: number;

  @OneToMany(() => Variant, (variant) => variant.product, {
    onDelete: "CASCADE",
  })
  variants: Variant[];
}
