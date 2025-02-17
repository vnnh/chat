import { PropsWithChildren } from "react";
import { ThemeProvider } from "../ctx/theme-provider";

function App(props: PropsWithChildren) {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="__ui_theme">
			{props.children}
		</ThemeProvider>
	);
}

export default App;
