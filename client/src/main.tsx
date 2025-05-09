import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/authContext/authContext.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Provider } from "react-redux";
import { store } from './store.ts' // path to your store.ts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
)
