import { Suspense, useEffect, useRef, useState } from "react";
import MessageList from "./message-list";
import useMessages, { IMessage } from "@/app/ctx/messages";
import { useSupabase } from "@/app/ctx/supabase-provider";
import { ITEMS_PER_PAGE } from "@/lib/supabase";

type Message = {
	author: string;
	created_at: string;
	id: string;
	is_edited: boolean;
	text: string;
	users: {
		avatar_url: string;
		created_at: string;
		display_name: string;
		id: string;
	};
};

export default function MessageListDriver() {
	const supabase = useSupabase();
	const { messages, predictions, addMessage, editMessage, deleteMessage, removePrediction } = useMessages();
	const predictionsRef = useRef(predictions);
	const [scrolledUp, setScrolledUp] = useState(false);
	const [newMessageCount, setNewMessageCount] = useState(0);

	const scrollRef = useRef<HTMLDivElement>(undefined!);

	useEffect(() => {
		predictionsRef.current = predictions;
	}, [predictions]);
	useEffect(() => {
		supabase.client
			.from("messages")
			.select("*,users(*)")
			.range(0, ITEMS_PER_PAGE)
			.order("created_at", { ascending: false })
			.then((v) => {
				const messages = v.data?.reverse() || [];

				useMessages.setState({ messages, hasMoreMessages: messages.length >= ITEMS_PER_PAGE });
			});

		const channel = supabase.client
			.channel("global")
			.on(
				"postgres_changes",
				{
					schema: "public",
					table: "messages",
					event: "INSERT",
				},
				(payload) => {
					const idx = predictionsRef.current.indexOf((payload.new as IMessage).id);
					if (idx !== -1) {
						removePrediction(idx);
						return;
					}

					supabase.client
						.from("users")
						.select("*")
						.eq("id", (payload.new as IMessage).author)
						.single()
						.then((v) => {
							addMessage({ ...(payload.new as IMessage), users: v.data });
							const scroll = scrollRef.current;
							if (scroll && scroll.scrollTop < scroll.scrollHeight - scroll.clientHeight - 10)
								setNewMessageCount((v) => v + 1);
						});
				},
			)
			.on(
				"postgres_changes",
				{
					schema: "public",
					table: "messages",
					event: "UPDATE",
				},
				(payload) => {
					supabase.client
						.from("users")
						.select("*")
						.eq("id", (payload.new as IMessage).author)
						.single()
						.then((v) => {
							editMessage(payload.new as IMessage);
						});
				},
			)
			.on(
				"postgres_changes",
				{
					schema: "public",
					table: "messages",
					event: "DELETE",
				},
				(payload) => {
					deleteMessage(payload.old.id);
				},
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (scrolledUp) return;

		const scroll = scrollRef.current;
		if (!scroll) return;

		scroll.scrollTop = scroll.scrollHeight;
	}, [messages]);

	return (
		<Suspense fallback={`Loading...`}>
			<MessageList
				messages={messages}
				scrollRef={scrollRef}
				newMessageCount={newMessageCount}
				scrolledUp={scrolledUp}
				setScrolledUp={(v) => {
					if (v === false) {
						setNewMessageCount(0);
					}
					setScrolledUp(v);
				}}
			/>
		</Suspense>
	);
}
