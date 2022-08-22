import type { Tests } from "@vangware/test";
import { createElement, useState } from "react";
import { renderToString } from "react-dom/server";
import { pair } from "../src/pair.js";
import type { PairedRenderFunction } from "../src/PairedRenderFunction.js";

const children = (usePairedState: typeof useState) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [count, setCount] = usePairedState(0);

	return createElement(
		"button",
		{ onClick: () => setCount(count + 1), type: "button" },
		count,
	);
};

const key = "TEST";

const PairedState = pair(useState);

export default [
	{
		given: "a paired hook with key",
		must: "return component wrapping hook and with key",
		received: () =>
			renderToString(createElement(PairedState, { children, key })),
		wanted: () =>
			renderToString(
				createElement(
					({
						children: render,
					}: {
						readonly children: PairedRenderFunction<
							typeof useState
						>;
					}) => render(useState),
					{ children, key },
				),
			),
	},
	{
		given: "a paired hook without key",
		must: "return component wrapping hook and without key",
		received: () =>
			renderToString(createElement(PairedState, { children })),
		wanted: () =>
			renderToString(
				createElement(
					({
						children: render,
					}: {
						readonly children: PairedRenderFunction<
							typeof useState
						>;
					}) => render(useState),
					{ children },
				),
			),
	},
] as Tests;
