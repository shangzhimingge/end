export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { getPayload } = await import('payload')
      const config = (await import('@payload-config')).default
      await getPayload({ config })
      console.log('[bootstrap] Payload initialized, schema pushed.')
    } catch (err) {
      console.error('[bootstrap] Payload init failed:', err)
    }
  }
}
