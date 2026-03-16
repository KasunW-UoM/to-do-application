import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 3001),
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://todokasun:Kasun@localhost:5432/todo_app',
};
