import type { GenericFunction } from "@vangware/types";
import type { Key } from "react";
import { createElement } from "react";
import type { PairWrapperProperties } from "./PairWrapperProperties.js";
import type { RenderFunction } from "./RenderFunction.js";

/**
 * Prepares a hook to be paired with a render function to avoid breaking rules
 * of hooks by creating a component context for every child.
 *
 * @example
 * ```tsx
 * const pairedCount = pair(useCount);
 *
 * // Inline using current value of array for key and internal values.
 * const Component = (array: number[]) => (
 * 	<ul>
 * 		{array.map(key =>
 * 			pairedCount(usePairedCount => {
 * 				const props = usePairedCount(key);
 *
 * 				return (
 * 					<li>
 * 						<button type="button" {...props} />
 * 					</li>
 * 				);
 * 			})(key),
 * 		)}
 * 	</ul>
 * );
 *
 * // or
 *
 * // Inline without key but using current value for internal values.
 * const Component = (array: number[]) => (
 * 	<ul>
 * 		{array.map(key =>
 * 			<li key={key}>
 * 				{pairedCount(usePairedCount => {
 * 					const props = usePairedCount(key);
 *
 * 					return <button type="button" {...props} />;
 * 				})()}
 * 			</li>
 * 		)}
 * 	</ul>
 * );
 *
 * // or
 *
 * // Not inline, and no key, with later execution.
 * const pairedCountRender = pairedCount(usePairedCount => {
 * 		const props = usePairedCount(0);
 *
 * 		return <button type="button" {...props} />;
 * 	})
 *
 * const Component = (array: number[]) => (
 * 	<ul>
 * 		{array.map(key =>
 * 			<li key={key}>
 * 				{pairedCountRender()}
 * 			</li>
 * 		)}
 * 	</ul>
 * );
 *
 * // or
 *
 * // Not inline, with key and later execution.
 * const pairedCountRender = pairedCount(usePairedCount => {
 * 		const props = usePairedCount(0);
 *
 * 		return (
 * 			<li>
 * 				<button type="button" {...props} />
 * 			</li>
 * 		);
 * 	})
 *
 * const Component = (array: number[]) => (
 * 	<ul>
 * 		{array.map(pairedCountRender)}
 * 	</ul>
 * );
 * ```
 * @param hook Hook to be paired.
 * @returns Function that expects a key and a render function that receives the paired hook.
 */
export const pair = <Hook extends GenericFunction>(hook: Hook) => {
	const PairWrapper = Object.assign(
		({ render }: PairWrapperProperties<Hook>) => render(hook),
		{ displayName: `paired(${hook.name})` },
	);

	/**
	 * Function that expects a key and a render function that receives the paired hook.
	 *
	 * @example
	 * ```tsx
	 * 	pairedCount(usePairedCount => {
	 * 		const props = usePairedCount(key);
	 *
	 * 		return (
	 * 			<li>
	 * 				<button type="button" {...props} />
	 * 			</li>
	 * 		);
	 * 	})(key);
	 * ```
	 * @param render Function that receives the paired hook.
	 * @param key Key to be used by the `PairWrapper` component on loops.
	 * @returns `PairWrapper` component with the hook paired to it.
	 */
	// eslint-disable-next-line react/display-name
	return (render: RenderFunction<Hook>) => (key?: Key) =>
		createElement(PairWrapper, { key, render });
};
