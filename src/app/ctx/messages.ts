import { Database } from "@/supabase";
import { create } from "zustand";

export type IMessage = Database["public"]["Tables"]["messages"]["Row"] & {
	users: Database["public"]["Tables"]["users"]["Row"];
};

const useMessages = create<{
	hasMoreMessages: boolean;
	page: number;
	messages: Array<IMessage>;
	currentMessage: IMessage | undefined;
	predictions: Array<string>;
	addMessage: (message: IMessage, isPrediction?: boolean) => void;
	setCurrentMessage: (message: IMessage) => void;
	editMessage: (message: IMessage) => void;
	deleteMessage: (messageId: string) => void;
	removePrediction: (idx: number) => void;
}>((set) => ({
	hasMoreMessages: true,
	page: 1,
	messages: [],
	currentMessage: undefined,
	predictions: [],
	addMessage: (message, isPrediction) =>
		set((state) => {
			if (isPrediction) {
				return { messages: [...state.messages, message], predictions: [...state.predictions, message.id] };
			} else {
				return { messages: [...state.messages, message] };
			}
		}),
	setCurrentMessage: (message) => set({ currentMessage: message }),
	editMessage: (message) =>
		set((state) => ({
			messages: state.messages.filter((v) => {
				if (v.id === message.id) {
					v.text = message.text;
					v.is_edited = message.is_edited;
				}

				return true;
			}),
		})),
	deleteMessage: (messageId) => set((state) => ({ messages: state.messages.filter((v) => v.id !== messageId) })),
	removePrediction: (idx) =>
		set((state) => {
			const predictions = [];
			let currentIdx = 0;
			console.log("remove", state.predictions[idx]);
			for (const v of state.predictions) {
				currentIdx++;
				if (idx === currentIdx) {
					continue;
				}
				predictions.push(v);
			}

			return { predictions };
		}),
}));

export default useMessages;
