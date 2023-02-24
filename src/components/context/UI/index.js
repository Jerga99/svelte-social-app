import { getContext } from "svelte";


export const key = Symbol();
export const getUIContext = () => getContext(key);
