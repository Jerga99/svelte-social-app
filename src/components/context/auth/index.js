import { getContext } from "svelte";

export const key = Symbol();
export const getAuthContext = () => getContext(key);
