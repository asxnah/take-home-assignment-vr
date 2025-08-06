import { useState, useEffect, useRef } from 'react';
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
	// отображение ошибки tel (менять вручную initial state)
	const [hasError, setHasError] = useState<boolean>(false);

	const navigate = useNavigate();

	const localStep = localStorage.getItem('step') === 'sms' ? 'sms' : 'tel';
	const [step, setStep] = useState<'tel' | 'sms'>(localStep);
	const [load, setLoad] = useState<boolean>(false);

	const localStorageTel = localStorage.getItem('tel') ?? '';
	const [tel, setTel] = useState<string>(localStorageTel);

	const [localTimeout, setLocalTimeout] = useState<number>(60);
	const [digits, setDigits] = useState<string[]>(['', '', '', '']);

	const digitsRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
		setDigits(['', '', '', '']);
		setLocalTimeout(60);
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
		localStorage.setItem('step', 'tel');
		localStorage.setItem('tel', '');
		setDigits(['', '', '', '']);
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
							<div className={styles.tel__loader}>
								<div className={styles.tel__loader__dim}></div>
								<LoadingIcon className={styles.tel__loader__icon} />
							</div>
						)}
						<motion.div
							className={styles.tel__error}
							initial={{
								y: -1000,
								opacity: 0,
							}}
							animate={{
								y: hasError ? 0 : -1000,
								opacity: hasError ? 1 : 0,
							}}
						>
							<ErrorIcon className={styles.tel__error__icon} />
							<div className={styles.tel__error__content}>
								<h4 className={styles.tel__error__title}>Ошибка</h4>
								<p className={styles.tel__error__text}>
									С момента последней отправки прошло слишком мало времени,
									повторите попытку позднее. Если у вас включен VPN, выключите и
									повторите попытку.
								</p>
							</div>
						</motion.div>
						<div className={styles.tel__heading}>
							<h2 className={styles.tel__heading__title}>Авторизация</h2>
							<p className={styles.tel__heading__text}>
								Войдите, чтобы управлять своими записями, управлять аккаунтом и
								смотреть ход лечения.
							</p>
						</div>
						<form className={styles.tel__form} onSubmit={handleNextStep}>
							<label htmlFor="tel" className={styles.tel__form__label}>
								Номер Телефона
							</label>
							<div
								className={
									load ? `${styles.tel} ${styles.tel__load}` : styles.tel
								}
							>
								<TelIcon />
								<p className={styles.tel__prefix}>+7&nbsp;</p>
								<IMaskInput
									id="tel"
									className={styles.tel__input}
									mask="000 000 00 00"
									definitions={{ '0': /\d/ }}
									unmask={false}
									value={tel}
									onAccept={(value) => setTel(value)}
									inputMode="numeric"
								/>
								<button
									className={styles.tel__button}
									type="button"
									onClick={() => setTel('')}
								>
									<CrossIcon />
								</button>
							</div>
							<motion.div className={styles.tel__submit}>
								<motion.p
									className={styles.tel__submit__text}
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
									<span className={styles.tel__submit__text__link}>
										Пользовательского соглашения и Политики кофиденциальности
									</span>
									, а также разрешаете обработку своих данных
								</motion.p>
								<button
									className={styles.tel__submit__button}
									type="submit"
									disabled={!(tel && tel.length === 13) || hasError === true}
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
						<button
							className={styles.smsStyles__backButton}
							onClick={handleBack}
						>
							<ArrowIcon />
							<span className={styles.smsStyles__backButton__text}>Назад</span>
						</button>

						<div className={styles.smsStyles__heading}>
							<h2 className={styles.smsStyles__heading__title}>
								Код подтверждения
							</h2>
							<p className={styles.smsStyles__heading__text}>
								Код отправлен на + 7 {tel} <br />
								Введите код из SMS
							</p>
						</div>
						<form className={styles.smsStyles__form} onSubmit={handleSubmit}>
							<div>
								<div className={styles.form__digits}>
									{digits.map((digit, i) => (
										<input
											className={styles.form__input}
											key={i}
											ref={(el) => {
												digitsRefs.current[i] = el;
											}}
											type="text"
											value={digit}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
												const value = e.target.value;
												if (value === '' || /^\d$/.test(value)) {
													const updatedDigits = [...digits];
													updatedDigits[i] = value;
													setDigits(updatedDigits);
													if (value && i < digits.length - 1) {
														digitsRefs.current[i + 1]?.focus();
													}
												}
											}}
											onKeyDown={(e) => {
												if (e.key === 'Backspace' && digit === '' && i > 0) {
													digitsRefs.current[i - 1]?.focus();
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
									<p className={styles.form__resendText}>
										Запросить повторно через: {localTimeout}
									</p>
								) : (
									<button
										onClick={() => {
											setLocalTimeout(60);
											setDigits(['', '', '', '']);
										}}
										style={{ all: 'unset' }}
									>
										<p className={styles.form__resendText}>
											Запросить код повторно
										</p>
									</button>
								)}
							</div>
							<button
								className={styles.form__button}
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
