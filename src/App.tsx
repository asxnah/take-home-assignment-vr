import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding/Onboarding';
import Auth from './pages/Auth/Auth';
import './App.css';
import Home from './pages/Home/Home';

function App() {
	return (
		<>
			<img
				src="/src/assets/imgs/header.png"
				alt="preview"
				style={{ borderRadius: '16px 16px 0 0', zIndex: 99 }}
			/>
			<Router>
				<Routes>
					<Route path="/" element={<Onboarding />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</Router>
			<img
				src="/src/assets/imgs/footer.png"
				alt="preview"
				style={{ borderRadius: '0 0 16px 16px', zIndex: 99 }}
			/>
		</>
	);
}

export default App;
