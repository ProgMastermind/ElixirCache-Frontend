import { server as WebSocketServer } from 'websocket';
import http from 'http';
import net from 'net';

const WS_PORT = 3001;
const REDIS_PORT = 6379;
const REDIS_HOST = 'localhost';

const httpServer = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

httpServer.listen(WS_PORT, () => {
    console.log((new Date()) + ` Server is listening on port ${WS_PORT}`);
});

const wsServer = new WebSocketServer({
    httpServer: httpServer,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // Put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', (request) => {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    
    const connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');

    const redisClient = new net.Socket();
    redisClient.connect(REDIS_PORT, REDIS_HOST, () => {
        console.log('Connected to Redis server');
    });

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            redisClient.write(message.utf8Data + '\r\n');
        }
    });

    redisClient.on('data', (data) => {
        console.log('Received from Redis:', data.toString());
        connection.sendUTF(data.toString());
    });

    connection.on('close', (reasonCode, description) => {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        redisClient.destroy();
    });

    redisClient.on('close', () => {
        console.log('Redis connection closed');
        connection.close();
    });
});
