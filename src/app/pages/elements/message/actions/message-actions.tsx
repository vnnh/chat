import useMessages, { IMessage } from "@/app/ctx/messages";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function MessageActions({ message }: { message: IMessage }) {
	const setCurrentMessage = useMessages((state) => state.setCurrentMessage);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreHorizontal />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => {
						setCurrentMessage(message);
						document.getElementById("edit-trigger")?.click();
					}}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setCurrentMessage(message);
						document.getElementById("delete-trigger")?.click();
					}}
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
