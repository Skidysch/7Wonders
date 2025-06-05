export async function withRetry<T>(fn: () => Promise<T>, retries = 1): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (retries > 0) {
      return await withRetry(fn, retries - 1)
    }
    throw err
  }
}
