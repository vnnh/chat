import { PropsWithChildren } from "react";
import { ThemeProvider } from "./ctx/theme-provider";
import Layout from "./pages/layout";
import { SupabaseProvider } from "./ctx/supabase-provider";
import { Toaster } from "@/components/ui/sonner";

export default function App(props: PropsWithChildren) {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="__ui_theme">
			<SupabaseProvider>
				<Layout />
				<Toaster position="top-center" />
				{props.children}
			</SupabaseProvider>
		</ThemeProvider>
	);
}
