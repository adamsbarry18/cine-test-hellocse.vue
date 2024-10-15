export async function waitForMilliseconds(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
