import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { motion } from 'framer-motion';
import { TelIcon } from './icons/TelIcon';
import { CrossIcon } from './icons/CrossIcon';
import { ErrorIcon } from './icons/ErrorIcon';
import styles from './styles.module.css';

const Tel = () => {
	const navigate = useNavigate();
	const localStorageTel = localStorage.getItem('tel') ?? '';

	const [tel, setTel] = useState<string>(localStorageTel);
	const hasError = false; // отображение ошибки

	const handleNextStep = () => {
		localStorage.setItem('tel', tel);
		navigate('/auth/sms');
	};

	return (
		<main className={styles.main}>
			<motion.div
				className={styles.error}
				initial={{
					y: -1000,
					opacity: 0,
				}}
				animate={{
					y: hasError ? 0 : -1000,
					opacity: hasError ? 1 : 0,
				}}
			>
				<ErrorIcon />
				<div>
					<h4>Ошибка</h4>
					<p>
						С момента последней отправки прошло слишком мало времени, повторите
						попытку позднее. Если у вас включен VPN, выключите и повторите
						попытку.
					</p>
				</div>
			</motion.div>
			<div className={styles.heading}>
				<h2>Авторизация</h2>
				<p>
					Войдите, чтобы управлять своими записями, управлять аккаунтом и
					смотреть ход лечения.
				</p>
			</div>
			<form>
				<label htmlFor="tel">Номер Телефона</label>
				<div className={styles.tel}>
					<TelIcon />
					<p>+7&nbsp;</p>
					<IMaskInput
						id="tel"
						mask="000 000 00 00"
						definitions={{ '0': /\d/ }}
						unmask={false}
						value={tel}
						onAccept={(value) => setTel(value)}
						inputMode="numeric"
					/>
					<button type="button" onClick={() => setTel('')}>
						<CrossIcon />
					</button>
				</div>
				<div className={styles.submit}>
					<p>
						Нажимая “Получить код” вы принимате условия{' '}
						<span>
							Пользовательского соглашения и Политики кофиденциальности
						</span>
						, а также разрешаете обработку своих данных
					</p>
					<button
						type="button"
						onClick={handleNextStep}
						disabled={!(tel && tel.length === 13)}
					>
						Получить код
					</button>
				</div>
			</form>
		</main>
	);
};

export default Tel;
