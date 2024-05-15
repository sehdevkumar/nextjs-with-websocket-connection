/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest } from 'next'
import { type NextApiResponseWithSocket } from './socket';

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {

  res.socket.server.io?.emit('client-new',Math.random())
 // eslint-disable-next-line @typescript-eslint/no-unsafe-call
 res.status(200).json({ message: 'From next js' })
}