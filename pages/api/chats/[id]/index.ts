import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
){
  const{
    query: {id},
    session:{user}
  }=req;
  const chatRoom = await client.chatRoom.findUnique({
    where:{
      id: Number(id),
    },
    include:{
      chatMessages:{
        select: {
          message: true,
          createdAt: true,
          userId: true,
        },
        orderBy: {
          /* createdAt: "desc", */
        },
      },
      host: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      invited: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      }
    }
  });
  res.json({
    ok: true,
    chatRoom,
  });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);