import { cls } from "@libs/client/utils";
import Image from "next/image";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string | null;
}

export default function Message({
  message,
  avatarUrl,
  reversed,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex  items-start",
        reversed ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"
      )}
    >
      <div className="relative w-10 h-10">
        {avatarUrl ? (
          <Image
            alt=""
            src={`https://imagedelivery.net/eDyjyaqPYNWgEueo37Q8vA/${avatarUrl}/public`}
            className="bg-slate-300 object-cover rounded-full"
            fill={true}
            priority={true}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-400" />
        )}
      </div>
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
