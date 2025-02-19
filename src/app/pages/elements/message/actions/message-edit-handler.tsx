import useMessages from "@/app/ctx/messages";
import MessageCard from "../message-card";
import { useSupabase } from "@/app/ctx/supabase-provider";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { toast } from "sonner";

export default function MessageEditHandler() {
	const supabase = useSupabase();
	const editMessage = useMessages((state) => state.editMessage);
	const currentMessage = useMessages((state) => state.currentMessage);

	const inputRef = useRef<HTMLInputElement>(undefined!);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button id="edit-trigger" />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit message</DialogTitle>
					<DialogDescription>The message will show that it is edited.</DialogDescription>
					<MessageCard message={currentMessage!} inputRef={inputRef} />
				</DialogHeader>
				<DialogFooter>
					<Button
						type="submit"
						onClick={async () => {
							const text = inputRef.current?.value.trim();
							if (text == "") {
								document.getElementById("edit-trigger")?.click();
								document.getElementById("delete-trigger")?.click();
								return;
							}

							editMessage({ ...currentMessage!, text, is_edited: true });
							const { error } = await supabase.client
								.from("messages")
								.update({ text, is_edited: true })
								.eq("id", currentMessage!.id);
							if (error) {
								toast.error(error.message);
							} else {
								toast.success("Message updated");
							}

							document.getElementById("edit-trigger")?.click();
						}}
					>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
