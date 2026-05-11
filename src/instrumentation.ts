export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  try {
    const { getPayload } = await import('payload')
    const config = (await import('@payload-config')).default
    const payload = await getPayload({ config })

    // Payload skips schema push in NODE_ENV=production. Force it manually.
    try {
      const drizzle: any = await import('@payloadcms/drizzle')
      const adapter: any = (payload as any).db
      if (drizzle.pushDevSchema && adapter) {
        await drizzle.pushDevSchema(adapter)
        console.log('[bootstrap] Payload schema force-pushed.')
      }
    } catch (pushErr) {
      console.warn('[bootstrap] schema push skipped:', pushErr)
    }

    console.log('[bootstrap] Payload initialized.')
  } catch (err) {
    console.error('[bootstrap] Payload init failed:', err)
  }
}
