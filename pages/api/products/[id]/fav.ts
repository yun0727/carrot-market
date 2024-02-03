import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { connect } from "http2";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
){
  const {
    query:{id},
    session:{user,}
  }=req;
  const alreadyExists =  await client.fav.findFirst({
    where:{
      // productId: +id.toString(),
      productId: Number(id),
      userId: user?.id,
    }
  });
  if (alreadyExists){
    await client.fav.delete({
      where:{
        id: alreadyExists.id,
      }
    });
  } else{
    await client.fav.create({
      data:{
        user:{
          connect:{
            id: user?.id,
          }
        },
        product:{
          connect:{
            // id: +id.toString()
            id: Number(id)
          }
        }
      }
    })
  }
  res.json({ok:true})
}

export default withApiSession(
  withHandler({
    methods:["POST"],
    handler
  })
)