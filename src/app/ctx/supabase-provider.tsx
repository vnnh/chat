import { getSupabaseClient } from "@/lib/supabase";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type SupabaseProviderState = {
	client: SupabaseClient;
	session: Session | null;
};

const SupabaseProviderContext = createContext<SupabaseProviderState>({
	client: getSupabaseClient(),
	session: null,
});

export function SupabaseProvider({ children }: React.PropsWithChildren) {
	const client = getSupabaseClient();

	const [session, setSession] = useState<Session | null>(null);
	useEffect(() => {
		client.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = client.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	return <SupabaseProviderContext.Provider value={{ client, session }}>{children}</SupabaseProviderContext.Provider>;
}

export function useSupabase() {
	const context = useContext(SupabaseProviderContext);
	return context;
}
