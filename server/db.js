// import { Client } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const DATABASE_URL = process.env.DATABASE_URL;
// export const client = new Client({
//   connectionString: DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export class VideoDB {
//   initialized: boolean = false;
//   client: Client;

//   constructor(client: Client) {
//     this.client = client;
//   }

//   connect() {
//     this.client.connect();
//     console.log("connected");
//   }

//   async initDb() {
//     await this.client.query(
//       `CREATE TABLE IF NOT EXISTS videos(
//             id SERIAL NOT NULL PRIMARY KEY,
//             name TEXT NOT NULL,
//             url TEXT NOT NULL,
//             tags TEXT[] NOT NULL,
//             comments TEXT NOT NULL
//         );`
//     );
//   }

//   async getAllVideos() {
//     let result = await this.client.query(`
//      SELECT * FROM videos; 
//     `);

//     return result;
//   }

//   async addTag(id: String, tags: String) {
    
//     let result = await this.client.query(`
//     UPDATE videos SET tags = '{${tags}}' WHERE id = ${id};
//    `);

//     return result; 
//   }
// }
