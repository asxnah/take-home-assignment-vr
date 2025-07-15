import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding/Onboarding';
import Auth from './pages/Auth/Auth';
import './App.css';
import Home from './pages/Home/Home';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Onboarding />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
