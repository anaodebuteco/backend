// database.js
import { MongoClient } from "mongodb";

const url = "mongodb+srv://pedro:<db_password>@cluster0.tzb483d.mongodb.net/"; 
const client = new MongoClient(url);

export async function conectarDb() {
  await client.connect();
  return client.db("agenda"); 
}
