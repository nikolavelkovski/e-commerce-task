import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, "models", "*.ts")],
  synchronize: true,
  logging: false,
});
