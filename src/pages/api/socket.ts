import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Server as IOServer } from "socket.io"
import { Server } from "socket.io"

export const config = {
  api: {
    bodyParser: false,
  },
}

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}
export default function SocketHandler(_req: NextApiRequest, res: NextApiResponseWithSocket) {
 if (res.socket.server.io) {
    res.end();
    return;
  }


  const io = new Server(res.socket.server);

  // Event handler for client connections
  io.on("connection", (socket) => {
    const clientId = socket.id;
    console.log("A client connected");
    console.log(`A client connected. ID: ${clientId}`);
    io.emit("client-new", clientId);

    // Event handler for receiving messages from the client
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });

    // Event handler for client disconnections
    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });

  res.socket.server.io = io;
  res.end();

}