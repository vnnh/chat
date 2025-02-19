import { useSupabase } from "../ctx/supabase-provider";
import About from "./about";
import ChatHeader from "./elements/chat-header";
import ChatInput from "./elements/chat-input";
import MessageListDriver from "./elements/message/message-list-driver";

export default function Home() {
	const supabase = useSupabase();
	return (
		<div className="max-w-3xl mx-auto md:py-15 h-screen">
			<div className="h-full border rounded-md flex flex-col relative">
				<ChatHeader />
				{supabase.session?.user ? (
					<>
						<MessageListDriver />
						<ChatInput />
					</>
				) : (
					<About />
				)}
			</div>
		</div>
	);
}
