import { type NextApiRequest } from 'next'
import { Server} from 'socket.io'

const Sockethandler = (req: NextApiRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("I was working ok",res.socket)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (res?.socket?.server?.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const io = new Server(res.socket.server)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.socket.server.io = io
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  res.end()
}

export default Sockethandler