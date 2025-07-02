import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding/Onboarding';
import Tel from './pages/Auth/Tel/Tel';
import SMS from './pages/Auth/SMS/SMS';
import './App.css';

function App() {
	return (
		<>
			<img
				src="/src/assets/imgs/header.png"
				alt="preview"
				style={{ borderRadius: '16px 16px 0 0' }}
			/>
			<Router>
				<Routes>
					<Route path="/" element={<Onboarding />} />
					<Route path="/auth/tel" element={<Tel />} />
					<Route path="/auth/sms" element={<SMS />} />
				</Routes>
			</Router>
			<img
				src="/src/assets/imgs/footer.png"
				alt="preview"
				style={{ borderRadius: '0 0 16px 16px' }}
			/>
		</>
	);
}

export default App;
