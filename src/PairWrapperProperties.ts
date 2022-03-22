import type { GenericFunction } from "@vangware/types";
import type { RenderFunction } from "./RenderFunction.js";

/**
 * Properties of the PairWrapper component.
 *
 * @category Internal
 */
export type PairWrapperProperties<Hook extends GenericFunction> = {
	readonly render: RenderFunction<Hook>;
};
