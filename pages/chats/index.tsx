import Layout from "@components/layout";
import { ChatMessages, ChatRoom, User } from "@prisma/client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ChatRoomWithMessages extends ChatRoom {
  chatMessages: ChatMessages[];
  host: User;
  invited: User;
}

interface ChatRoomsResponse {
  ok: boolean;
  chatRooms: ChatRoomWithMessages[];
}

const Chats: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ChatRoomsResponse>(`/api/chats`);
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {data?.chatRooms.map((chatRoom) => (
          <Link legacyBehavior href={`/chats/${chatRoom.id}`} key={chatRoom.id}>
            <a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="relative w-10 h-10">
                {chatRoom.host.avatar || chatRoom.invited.avatar ? (
                  <Image
                    alt=""
                    src={`https://imagedelivery.net/eDyjyaqPYNWgEueo37Q8vA/${
                      chatRoom.chatMessages[chatRoom.chatMessages.length - 1]
                        ?.userId === chatRoom.invitedId
                        ? chatRoom.invited.avatar
                        : chatRoom.host.avatar
                    }/public`}
                    className="bg-slate-300 object-cover rounded-full"
                    fill={true}
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 100vw,
                        100vw"
                    priority={true}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-400" />
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">
                  {chatRoom.chatMessages[chatRoom.chatMessages.length - 1]
                    ?.userId === chatRoom.invitedId
                    ? chatRoom.invited.name
                    : chatRoom.host.name}
                </p>
                <p className="text-sm  text-gray-500">
                  {
                    chatRoom.chatMessages[chatRoom.chatMessages.length - 1]
                      ?.message
                  }
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
