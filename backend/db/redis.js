import { createClient } from 'redis';
import "dotenv/config";


const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
await client.flushAll('SYNC');
console.log("✅ RedIs is connected !!!!")
export  default  client;

