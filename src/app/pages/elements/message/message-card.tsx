import { IMessage } from "@/app/ctx/messages";
import Message from "./message";
import { RefObject } from "react";

export default function MessageCard({
	message,
	inputRef,
}: {
	message: IMessage;
	inputRef?: RefObject<HTMLInputElement>;
}) {
	return (
		<div className="bg-background gap-4 rounded-lg border my-2 px-5 py-5 shadow-lg sm:max-w-lg">
			<Message message={message} currentUser={undefined} inputRef={inputRef} />
		</div>
	);
}
