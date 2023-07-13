import type { Tests } from "@vangware/test";
import { createElement, useState } from "react";
import { renderToString } from "react-dom/server";
import type { PairedComponentProperties } from "../src/PairedComponentProperties.js";
import { pair } from "../src/pair.js";

const render = (usePairedState: typeof useState) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [count, setCount] = usePairedState(0);

	return (
		<button onClick={() => setCount(count + 1)} type="button">
			{count}
		</button>
	);
};

const Wanted = ({ children }: PairedComponentProperties<typeof useState>) =>
	children(useState);

const key = "TEST";

const PairedState = pair(useState);

export default [
	{
		given: "a paired hook with key",
		must: "return component wrapping hook and with key",
		received: () =>
			renderToString(<PairedState key={key}>{render}</PairedState>),
		wanted: () => renderToString(<Wanted key={key}>{render}</Wanted>),
	},
	{
		given: "a paired hook without key",
		must: "return component wrapping hook and without key",
		received: () => renderToString(<PairedState>{render}</PairedState>),
		wanted: () => renderToString(<Wanted>{render}</Wanted>),
	},
] satisfies Tests<string>;
