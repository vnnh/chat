import { IMessage } from "@/app/ctx/messages";
import Message from "./message";
import { useSupabase } from "@/app/ctx/supabase-provider";
import MessageDeleteHandler from "./actions/message-delete-handler";
import MessageEditHandler from "./actions/message-edit-handler";
import { ArrowDown } from "lucide-react";
import LoadMore from "./load-more";

export default function MessageList(props: {
	messages: Array<IMessage>;
	scrollRef: React.RefObject<HTMLDivElement>;
	newMessageCount: number;
	scrolledUp: boolean;
	setScrolledUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const current_user = useSupabase().session?.user;

	return (
		<>
			<div
				className="flex-1 flex flex-col p-5 h-full overflow-y-auto"
				ref={props.scrollRef}
				onScroll={() => {
					const scroll = props.scrollRef.current;
					if (!scroll) return;

					props.setScrolledUp(scroll.scrollTop < scroll.scrollHeight - scroll.clientHeight - 10);
				}}
			>
				<LoadMore />
				<div className="space-y-5">
					{props.messages.map((v) => {
						return <Message key={v.id} message={v} currentUser={current_user} />;
					})}
				</div>

				<MessageDeleteHandler />
				<MessageEditHandler />
			</div>

			{props.scrolledUp && (
				<div className="absolute bottom-20 w-full">
					{props.newMessageCount > 0 ? (
						<div
							className="w-36 mx-auto bg-indigo-500 p-1 rounded-md"
							onClick={() => {
								const scroll = props.scrollRef.current;
								if (!scroll) return;

								scroll.scrollTop = scroll.scrollHeight;
							}}
						>
							<h1>{props.newMessageCount} new messages</h1>
						</div>
					) : (
						<div
							className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex mx-auto border hover:bg-blue-600 cursor-pointer hover:scale-110 transition-all"
							onClick={() => {
								const scroll = props.scrollRef.current;
								if (!scroll) return;

								scroll.scrollTop = scroll.scrollHeight;
							}}
						>
							<ArrowDown />
						</div>
					)}
				</div>
			)}
		</>
	);
}
