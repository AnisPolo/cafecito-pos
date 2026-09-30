import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import MenuPage from './pages/MenuPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/producto" element={<ProductPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
    </Routes>
  )
}
