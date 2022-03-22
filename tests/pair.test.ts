import type { Tests } from "@vangware/test";
import { createElement, useState } from "react";
import { renderToString } from "react-dom/server.js";
import { pair } from "../src/pair.js";
import type { PairWrapperProperties } from "../src/PairWrapperProperties.js";

const render = (usePairedState: typeof useState) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [count, setCount] = usePairedState(0);

	return createElement(
		"button",
		{ onClick: () => setCount(count + 1), type: "button" },
		count,
	);
};

const key = "TEST";

const pairedUseStateRender = pair(useState)(render);

export default [
	{
		given: "a paired hook with key",
		must: "return component wrapping hook and with key",
		received: renderToString(pairedUseStateRender(key)),
		wanted: renderToString(
			createElement(
				(properties: PairWrapperProperties<typeof useState>) =>
					properties.render(useState),
				{ key, render },
			),
		),
	},
	{
		given: "a paired hook without key",
		must: "return component wrapping hook and without key",
		received: renderToString(pairedUseStateRender()),
		wanted: renderToString(
			createElement(
				(properties: PairWrapperProperties<typeof useState>) =>
					properties.render(useState),
				{ render },
			),
		),
	},
] as Tests;
