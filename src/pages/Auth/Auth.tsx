import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { motion, AnimatePresence } from 'framer-motion';

import { TelIcon } from './icons/TelIcon';
import { CrossIcon } from './icons/CrossIcon';
import { ErrorIcon } from './icons/ErrorIcon';
import { LoadingIcon } from './icons/LoadingIcon';
import { ArrowIcon } from './icons/ArrowIcon';

import styles from './styles.module.css';

const Auth = () => {
	// отображение ошибки tel — меняйте
	const [hasError, setHasError] = useState<boolean>(false);

	const navigate = useNavigate();

	const localStep = localStorage.getItem('step') === 'sms' ? 'sms' : 'tel';
	const [step, setStep] = useState<'tel' | 'sms'>(localStep);
	const [load, setLoad] = useState<boolean>(false);

	const localStorageTel = localStorage.getItem('tel') ?? '';
	const [tel, setTel] = useState<string>(localStorageTel);

	const [localTimeout, setLocalTimeout] = useState<number>(60);
	const [digits, setDigits] = useState<string[]>(['', '', '', '']);

	const handleNextStep = () => {
		localStorage.setItem('tel', tel);
		localStorage.setItem('step', 'sms');
		setHasError(false);
		setLoad(true);

		setTimeout(() => {
			setLoad(false);
			setStep('sms');
		}, 1000);
	};

	const handleBack = () => {
		localStorage.setItem('step', 'tel');
		setStep('tel');
	};

	useEffect(() => {
		if (step !== 'sms' || localTimeout === 0) return;

		const timer = setInterval(() => {
			setLocalTimeout((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [step, localTimeout]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/home');
	};

	return (
		<div style={{ position: 'relative', height: 765 }}>
			<AnimatePresence mode="sync">
				{step === 'tel' && (
					<motion.main
						className={styles.telStyles}
						key="tel"
						initial={{
							opacity: 1,
							position: 'absolute',
						}}
						exit={{
							opacity: 0,
							position: 'absolute',
						}}
						transition={{ duration: 0.3 }}
					>
						{load && (
							<div className={styles.load}>
								<div className={styles.dim}></div>
								<LoadingIcon />
							</div>
						)}
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
									С момента последней отправки прошло слишком мало времени,
									повторите попытку позднее. Если у вас включен VPN, выключите и
									повторите попытку.
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
							<div
								className={
									load ? `${styles.tel} ${styles.telLoad}` : styles.tel
								}
							>
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
							<motion.div className={styles.submit}>
								<motion.p
									initial={{
										opacity: 0,
										y: 80,
									}}
									animate={{
										opacity: 1,
										y: 0,
									}}
									transition={{ duration: 0.2 }}
									style={{ width: '100%' }}
								>
									Нажимая “Получить код” вы принимате условия{' '}
									<span>
										Пользовательского соглашения и Политики кофиденциальности
									</span>
									, а также разрешаете обработку своих данных
								</motion.p>
								<button
									type="button"
									onClick={handleNextStep}
									disabled={!(tel && tel.length === 13)}
								>
									Получить код
								</button>
							</motion.div>
						</form>
					</motion.main>
				)}

				{step === 'sms' && (
					<motion.main
						className={styles.smsStyles}
						key="sms"
						initial={{
							opacity: 0,
							position: 'absolute',
						}}
						animate={{
							opacity: 1,
							position: 'absolute',
						}}
						transition={{ duration: 0.3 }}
					>
						<button onClick={handleBack}>
							<ArrowIcon />
							Назад
						</button>

						<div className={styles.heading}>
							<h2>Код подтверждения</h2>
							<p>
								Код отправлен на + 7 {tel} <br />
								Введите код из SMS
							</p>
						</div>
						<form onSubmit={handleSubmit}>
							<div>
								<div className={styles.digits}>
									{digits.map((digit, i) => (
										<input
											key={i}
											type="text"
											value={digit}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value;
												if (value === '' || /^\d$/.test(value)) {
													const updatedDigits = [...digits];
													updatedDigits[i] = value;
													setDigits(updatedDigits);
												}
											}}
											pattern="\d"
											inputMode="numeric"
											min={0}
											max={9}
											maxLength={1}
										/>
									))}
								</div>
								{localTimeout !== 0 ? (
									<p>Запросить повторно через: {localTimeout}</p>
								) : (
									<button
										onClick={() => {
											setLocalTimeout(60);
											setDigits(['', '', '', '']);
										}}
										style={{ all: 'unset' }}
									>
										<p>Запросить код повторно</p>
									</button>
								)}
							</div>
							<button
								type="submit"
								disabled={digits.some((digit) => digit === '')}
							>
								Продолжить
							</button>
						</form>
					</motion.main>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Auth;
