import { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent){
  console.log("hello")
  if (req.nextUrl.pathname.startsWith('/chats')){
    console.log(`this is chats ONLY middleware`)
  }
}