import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
){
  const{
    query:{id},
    session: {user},
  }=req;
  const post = await client.post.findUnique({
    where:{
      id: +id.toString(),
    },
    include:{
      user:{
        select:{
          id: true,
          name: true,
          avatar: true,
        }
      },
      answers:{
        select:{
          answer: true,
          id: true,
          user:{
            select:{
              id: true,
              name:true,
              avatar: true
            }
          }
        }
      },
      _count:{
        select:{
          answers: true,
          wondering: true,
        }
      }
    }
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where:{
        postId: +id.toString(),
        userId: user?.id,
      },
      select:{
        id: true,
      }
    })
  )
  res.json({
    ok: true,
    post, isWondering,
  })
}

export default withApiSession(
  withHandler({
    methods:["GET"],
    handler
  })
)