import useMessages, { IMessage } from "@/app/ctx/messages";
import { useSupabase } from "@/app/ctx/supabase-provider";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function ChatInput() {
	const supabase = useSupabase();
	const addMessage = useMessages((state) => state.addMessage);
	return (
		<div className="p-5">
			<Input
				placeholder="Send message"
				onKeyDown={async (e) => {
					if (e.key === "Enter") {
						const text = e.currentTarget.value.trim();
						e.currentTarget.value = "";
						if (text == "") return;

						const user = supabase.session!.user;
						const predictedMessage: IMessage = {
							id: uuidv4(),
							text,
							author: user.id,
							is_edited: false,
							created_at: new Date().toISOString(),
							users: {
								id: user.id,
								avatar_url: user.user_metadata.avatar_url,
								created_at: new Date().toISOString(),
								display_name: user.user_metadata.user_name,
							},
						};

						addMessage(predictedMessage, true);

						const { error } = await supabase.client
							.from("messages")
							.insert({ text, id: predictedMessage.id });
						if (error) {
							toast.error(error.message);
						}
					}
				}}
			/>
		</div>
	);
}
