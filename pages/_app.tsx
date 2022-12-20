import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as AppContextProvider } from '../contexts/app'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
