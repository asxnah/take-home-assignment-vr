import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconOne } from './icons/IconOne';
import { IconTwo } from './icons/IconTwo';
import { IconThree } from './icons/IconThree';
import { SliderOne } from './icons/SliderOne';
import { SliderTwo } from './icons/SliderTwo';
import { SliderThree } from './icons/SliderThree';
import styles from './styles.module.css';

interface Step {
	icon: ReactNode;
	title: string;
	description: string;
}

const steps: Step[] = [
	{
		icon: <IconOne style={{ paddingTop: '39px' }} />,
		title: 'Добро Пожаловать!',
		description:
			'Мы поможем вам эффективно и легко записываться на прием к врачам. Давайте начнем!',
	},
	{
		icon: <IconTwo style={{ paddingTop: '80px' }} />,
		title: 'Выберите Специализацию',
		description:
			'Выберите нужную вам медицинскую специализацию, чтобы мы могли адаптировать ваш опыт.',
	},
	{
		icon: <IconThree style={{ paddingTop: '48px' }} />,
		title: 'Запланируйте Свой Первый Прием',
		description:
			'Выберите удобное время и дату для встречи с желаемым врачом. Начните свой путь к лучшему здоровью!',
	},
];

const Onboarding = () => {
	const [stepIndex, setStepIndex] = useState(0);
	const navigate = useNavigate();

	const handleNext = () => {
		if (stepIndex < steps.length - 1) {
			setStepIndex(stepIndex + 1);
		} else {
			navigate('/auth/tel');
		}
	};

	return (
		<main>
			<div className={styles.main}>
				<div className={styles.content}>
					{stepIndex === 0 && (
						<motion.div
							initial={
								stepIndex === 0
									? {
											opacity: 1,
											y: 150,
											position: 'absolute',
											top: 0,
											left: 0,
											right: 0,
											margin: 'auto',
									  }
									: { opacity: 1, y: 0, position: 'static' }
							}
							animate={
								stepIndex === 0
									? { opacity: 1, y: 0, position: 'static' }
									: { opacity: 0, y: 0, position: 'absolute' }
							}
							transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							{steps[0].icon}
						</motion.div>
					)}
					{(stepIndex === 1 || stepIndex === 2) && (
						<motion.div
							initial={{ opacity: 0, y: 0, position: 'absolute' }}
							animate={
								stepIndex === 1
									? { opacity: 1, y: 0, position: 'static' }
									: { opacity: 0, y: 0, position: 'absolute' }
							}
							transition={{ duration: 0.2 }}
							style={{ width: '100%' }}
						>
							{steps[1].icon}
						</motion.div>
					)}
					{stepIndex === 2 && (
						<motion.div
							initial={{ opacity: 0, y: 0, position: 'absolute' }}
							animate={
								stepIndex === 2
									? { opacity: 1, y: 0, position: 'static' }
									: { opacity: 0, y: 0, position: 'absolute' }
							}
							transition={{ duration: 0.2 }}
							style={{ width: '100%' }}
						>
							{steps[2].icon}
						</motion.div>
					)}

					{stepIndex === 0 && (
						<motion.div
							initial={
								stepIndex === 0
									? { opacity: 0, y: 0, position: 'static' }
									: { opacity: 1, y: 0, position: 'static' }
							}
							animate={
								stepIndex === 0
									? { opacity: 1, y: 0, position: 'static' }
									: stepIndex === 1
									? { opacity: 0, y: 50, position: 'absolute' }
									: { display: 'none' }
							}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							style={{ width: '100%' }}
						>
							<h2>{steps[0].title}</h2>
							<p>{steps[0].description}</p>
						</motion.div>
					)}
					{(stepIndex === 1 || stepIndex === 2) && (
						<motion.div
							initial={{ opacity: 0, y: 50, position: 'absolute' }}
							animate={
								stepIndex === 1
									? { opacity: 1, y: 0, position: 'static' }
									: stepIndex === 2
									? { opacity: 0, y: 0, position: 'absolute' }
									: { display: 'none' }
							}
							transition={{ duration: 0.2 }}
							style={{ width: '100%' }}
						>
							<h2>{steps[1].title}</h2>
							<p>{steps[1].description}</p>
						</motion.div>
					)}
					{stepIndex === 2 && (
						<motion.div
							initial={{ opacity: 0, y: 0, position: 'absolute' }}
							animate={{ opacity: 1, y: 0, position: 'static' }}
							transition={{ duration: 0.2 }}
							style={{ width: '100%' }}
						>
							<h2>{steps[2].title}</h2>
							<p>{steps[2].description}</p>
						</motion.div>
					)}
				</div>

				<motion.div
					initial={
						stepIndex === 0
							? { opacity: 0, y: 0, position: 'static' }
							: { opacity: 1, y: 0, position: 'static' }
					}
					animate={{ opacity: 1, y: 0, position: 'static' }}
					exit={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					style={{ width: '100%' }}
				>
					<div className={styles.slider}>
						<motion.div
							animate={{
								x: stepIndex === 0 ? 0 : stepIndex === 1 ? 17 : 28,
							}}
							transition={{ duration: 0.2 }}
						>
							<SliderOne />
						</motion.div>
						<motion.div
							animate={{ x: stepIndex === 0 ? 0 : stepIndex === 1 ? -39 : -39 }}
							transition={{ duration: 0.2 }}
						>
							<SliderTwo />
						</motion.div>
						<motion.div
							animate={{ x: stepIndex === 0 ? 0 : stepIndex === 1 ? 0 : -40 }}
							transition={{ duration: 0.2 }}
						>
							<SliderThree />
						</motion.div>
					</div>
					<button onClick={handleNext}>Далее ➜</button>
				</motion.div>
			</div>
		</main>
	);
};

export default Onboarding;
