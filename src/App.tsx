import './App.css';
import React, { Suspense } from 'react';
import { Landing } from './components/Landing/Landing';
import { Logo } from './components/Logo/Logo';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import {AddBook} from './components/AddBook/AddBook'
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import { useQueryClientConfig } from './config/react-query-client';
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from 'react-query';
const Contact = React.lazy(() => import('./components/Contact/Contact'));

function App() {
	const { queryClient } = useQueryClientConfig();

	return (
		<QueryClientProvider client={queryClient}>
			{process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools position="top-right" initialIsOpen={false} />
        )}
			<Suspense fallback={<div>Loading...</div>}>
				<Routers>
					<Routes>
						<Route path="/" element={<Logo />} />
						<Route path="home" element={<Landing />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="contact" element={<Contact />} />
						<Route path="addBook" element={<AddBook />} />
						<Route path="*" element={<div>404</div>} />
					</Routes>
				</Routers>
			</Suspense>
		</QueryClientProvider>
	);
}

export default App;
