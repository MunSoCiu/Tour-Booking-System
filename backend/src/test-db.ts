import "reflect-metadata";
import { DataSource } from "typeorm";
import ormconfig from "./ormconfig";

const ds = new DataSource(ormconfig as any);

ds.initialize()
  .then(() => {
    console.log("✔️ DB CONNECT OK");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ DB CONNECT FAIL", err);
    process.exit(1);
  });
