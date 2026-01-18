import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'LfczOucg16X9moBFBiuESE32MC9E9M0r',
    socket: {
        host: 'redis-17584.c285.us-west-2-2.ec2.cloud.redislabs.com',
        port: 17584
    }
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
await client.flushAll('SYNC');
console.log("✅ RedIs is connected !!!!")
export  default  client;

