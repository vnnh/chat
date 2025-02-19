import useMessages from "@/app/ctx/messages";
import { useSupabase } from "@/app/ctx/supabase-provider";
import { Button } from "@/components/ui/button";
import { ITEMS_PER_PAGE, pageBounds } from "@/lib/supabase";

export default function LoadMore() {
	const supabase = useSupabase();
	const page = useMessages((state) => state.page);
	const hasMoreMessages = useMessages((state) => state.hasMoreMessages);

	return hasMoreMessages ? (
		<div className="flex-1 pb-5 flex items-end">
			<Button
				variant={"outline"}
				className="w-full"
				onClick={() => {
					const { from, to } = pageBounds(page, ITEMS_PER_PAGE);
					supabase.client
						.from("messages")
						.select("*,users(*)")
						.range(from, to)
						.order("created_at", { ascending: false })
						.then((v) => {
							useMessages.setState((state) => {
								const newMessages = v.data?.reverse() || [];
								return {
									messages: [...newMessages, ...state.messages],
									page: state.page + 1,
									hasMoreMessages: newMessages.length >= ITEMS_PER_PAGE,
								};
							});
						});
				}}
			>
				Load more
			</Button>
		</div>
	) : (
		<div className="flex-1" />
	);
}
