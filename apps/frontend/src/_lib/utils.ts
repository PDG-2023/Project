/**
 * Wait an amount of tim
 * @param time to wait in milliseconds
 * @returns Promise when wake up
 */
export function sleep(time: number) {
	return new Promise<void>(r => setTimeout(r, time));
}
