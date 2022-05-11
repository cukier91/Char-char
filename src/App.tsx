import './App.css';
import { Landing } from './components/Landing/Landing';
import { Logo } from './components/Logo/Logo';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import Contact from './components/Contact/Contact';

function App() {
	return (
		<Routers>
			<Routes>
				<Route path="/" element={<Logo />} />
				<Route path="/home" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</Routers>
	);
}

export default App;
