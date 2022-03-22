import type { GenericFunction, Unary } from "@vangware/types";
import type { ReactElement } from "react";

/**
 * Function that receives the paired hook and should return a `ReactElement`.
 *
 * @category Internal
 */
export type RenderFunction<Hook extends GenericFunction> = Unary<
	Hook,
	ReactElement
>;
