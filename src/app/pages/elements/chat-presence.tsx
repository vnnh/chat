import { useSupabase } from "@/app/ctx/supabase-provider";
import { useEffect, useState } from "react";

export default function ChatPresence() {
	const supabase = useSupabase();
	const [numOnline, setNumOnline] = useState(0);

	useEffect(() => {
		const channel = supabase.client.channel("room1");
		const subscription = channel
			.on("presence", { event: "sync" }, () => {
				const ids = new Set();
				const presenceState = channel.presenceState();
				for (const id in presenceState) {
					// @ts-expect-error not typed
					ids.add(presenceState[id][0].user_id);
				}

				setNumOnline(ids.size);
			})
			.subscribe(async (status) => {
				if (status === "SUBSCRIBED") {
					await channel.track({ online_at: new Date().toISOString(), user_id: supabase.session?.user.id });
				}
			});

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase.session?.user]);

	if (!supabase.session?.user) return <div className="h-3 w-1"></div>;

	return (
		<div className="flex items-center gap-2">
			<div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mt-0.5"></div>
			<h1 className="text-sm text-gray-400">{numOnline} Online</h1>
		</div>
	);
}
