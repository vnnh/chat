import { ModeToggle } from "@/components/mode-toggle";
import Home from "./home";

export default function Layout() {
	return (
		<>
			<header className="bg-background fixed inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
				<div className="flex h-(--header-height) w-full items-center gap-2 px-4">
					<div className="ml-auto flex items-center gap-2">
						<ModeToggle />
					</div>
				</div>
			</header>
			<Home />
		</>
	);
}
