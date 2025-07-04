import { useNavigate } from 'react-router-dom';
import { IconOne } from './icons/IconOne';
import styles from './styles.module.css';
import { motion } from 'framer-motion';

const Home = () => {
	const navigate = useNavigate();

	return (
		<main className={styles.main}>
			<motion.div
				initial={{ opacity: 0, y: -100, transitionTimingFunction: 'ease-out' }}
				animate={{ opacity: 1, y: 0, transitionTimingFunction: 'ease-out' }}
			>
				<h1>Добро пожаловать!</h1>
				<p>Это главный экран</p>
			</motion.div>
			<IconOne />
			<button onClick={() => navigate('/')}>
				Вернуться на экран загрузки ↩
			</button>
		</main>
	);
};

export default Home;
