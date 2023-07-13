import type { Function, Unary } from "@vangware/types";
import type { createElement } from "react";

/**
 * Function that receives the paired hook and should return a `ReactElement`.
 *
 * @category Internal
 */
export type PairedRenderFunction<Hook extends Function> = Unary<
	Hook,
	ReturnType<typeof createElement>
>;
