import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { message },
    query: { id },
    session: { user },
  } = req;
  const chatMessages = await client.chatMessages.create({
    data: {
      message: message,
      chatRoom: {
        connect: {
          id: Number(id),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    chatMessages,
  });
}
export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);