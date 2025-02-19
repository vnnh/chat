import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "../app/ctx/theme-provider";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant={"ghost"}
			size={"lg"}
			onClick={() => {
				setTheme(theme === "dark" ? "light" : "dark");
			}}
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
