import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useGoogleAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-Z3VTDKXJ7Z', {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}