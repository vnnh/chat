import useMessages from "@/app/ctx/messages";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MessageCard from "../message-card";
import { useSupabase } from "@/app/ctx/supabase-provider";
import { toast } from "sonner";

export default function MessageDeleteHandler() {
	const supabase = useSupabase();
	const deleteMessage = useMessages((state) => state.deleteMessage);
	const currentMessage = useMessages((state) => state.currentMessage);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button id="delete-trigger" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. Your message will be permanently deleted.
					</AlertDialogDescription>
					<MessageCard message={currentMessage!} />
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							deleteMessage(currentMessage!.id);
							const { error } = await supabase.client
								.from("messages")
								.delete()
								.eq("id", currentMessage!.id);
							if (error) {
								toast.error(error.message);
							} else {
								toast.success("Message deleted");
							}
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
