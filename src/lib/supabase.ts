import { Database } from "@/supabase";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const ITEMS_PER_PAGE = 10;

let supabaseClient: SupabaseClient<Database> | null = null;

export function getSupabaseClient() {
	if (!supabaseClient) {
		supabaseClient = createClient<Database>(
			"https://skaocradvtfeqwfhcdjr.supabase.co",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYW9jcmFkdnRmZXF3ZmhjZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NDU2MDQsImV4cCI6MjA1NTQyMTYwNH0.KcN8627hOedYMsnCxpExwnEAOC7LOeqFb837vmhb2M0",
		);
	}

	return supabaseClient;
}

export function pageBounds(page: number, itemsPerPage: number) {
	let from = page * itemsPerPage;
	let to = from + itemsPerPage;
	if (page > 0) from += 1;

	return { from, to };
}
