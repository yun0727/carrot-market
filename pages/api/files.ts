import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
){
  res.json({
    ok: true,
    url:""
  })
}

export default withApiSession(
  withHandler({
    methods:["POST"],
    handler,
  })
)