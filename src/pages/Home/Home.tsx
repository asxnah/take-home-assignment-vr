import { useNavigate } from 'react-router-dom';
import { IconOne } from './icons/IconOne';
import styles from './styles.module.css';
import { motion } from 'framer-motion';

const Home = () => {
	const navigate = useNavigate();

	return (
		<main className={styles.main}>
			<motion.div
				className={styles.main__content}
				initial={{ opacity: 0, y: -100, transitionTimingFunction: 'ease-out' }}
				animate={{ opacity: 1, y: 0, transitionTimingFunction: 'ease-out' }}
			>
				<h1 className={styles.main__title}>Добро пожаловать!</h1>
				<p className={styles.main__description}>Это главный экран</p>
			</motion.div>
			<IconOne className={styles.main__icon} />
			<button className={styles.main__button} onClick={() => navigate('/')}>
				Вернуться на экран загрузки
			</button>
		</main>
	);
};

export default Home;
