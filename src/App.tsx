import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pages from './pages/Pages'
import Navbar from './components/UtilityComponents/Navbar'
import Detail from './pages/Detail'
import Footer from './components/UtilityComponents/Footer'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import Provider from './context/Context'
import { queryClient, persister } from './context/QueryClient'

const App: React.FC = () => {
  return (
    <PersistQueryClientProvider 
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 24 * 60 * 60 * 1000, // Dữ liệu sẽ được lưu trong localStorage trong 24h
        dehydrateOptions: {
          shouldDehydrateQuery: (q) => q.state.status === 'success' // Không lưu trữ lỗi 
        }
      }}
    >
      <Provider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie' element={<Pages type='movie' location='Movies'/>} />
          <Route path='/tv' element={<Pages type='tv' location='TV Series' />} />
          <Route path='/:type/:id' element={<Detail />} />
        </Routes>
        <Footer/>
      </Provider>
    </PersistQueryClientProvider>
  )
}

export default App
