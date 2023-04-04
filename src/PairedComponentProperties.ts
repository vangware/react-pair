import type { Function } from "@vangware/types";
import type { PairedRenderFunction } from "./PairedRenderFunction.js";

/**
 * Paired component properties (just children with the paired hook render function).
 *
 * @category Internal
 */
export type PairedComponentProperties<Hook extends Function> = {
	/** Children has to be a function, and the argument is the paired hook. */
	readonly children: PairedRenderFunction<Hook>;
};
