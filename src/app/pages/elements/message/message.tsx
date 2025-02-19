import { IMessage } from "@/app/ctx/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageActions from "./actions/message-actions";
import { User } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { RefObject } from "react";

export default function Message({
	message,
	inputRef,
	currentUser,
}: {
	message: IMessage;
	inputRef?: RefObject<HTMLInputElement>;
	currentUser: User | undefined;
}) {
	return (
		<div className="flex gap-2" key={message.id}>
			<Avatar className="w-10 h-10">
				<AvatarImage src={message.users.avatar_url} />
				<AvatarFallback>{message.users.display_name[0]}</AvatarFallback>
			</Avatar>
			<div className="flex-1">
				<div className="flex items-center gap-1 mb-0.5 justify-between">
					<div className="flex items-center gap-1">
						<h1 className="font-bold">{message.users.display_name}</h1>
						<h1 className="text-sm text-gray-400">{new Date(message.created_at).toDateString()}</h1>
						{message.is_edited && <h1 className="text-sm text-gray-400">Edited</h1>}
					</div>
					{message.users.id === currentUser?.id && <MessageActions message={message} />}
				</div>
				{inputRef ? (
					<Input defaultValue={message.text} ref={inputRef} />
				) : (
					<p className="text-gray-300">{message.text}</p>
				)}
			</div>
		</div>
	);
}
