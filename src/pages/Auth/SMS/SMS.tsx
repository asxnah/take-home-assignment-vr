import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from './icons/ArrowIcon';
import styles from './styles.module.css';

const SMS = () => {
	const navigate = useNavigate();

	const tel = localStorage.getItem('tel') ?? '';
	const [localTimeout, setLocalTimeout] = useState<number>(60);
	const [digits, setDigits] = useState<string[]>(['', '', '', '']);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/');
	};

	useEffect(() => {
		if (localTimeout === 0) return;

		const timer = setInterval(() => {
			setLocalTimeout((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [localTimeout]);

	return (
		<main className={styles.main}>
			<button onClick={() => navigate('/auth/tel')}>
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
							onClick={() => setLocalTimeout(60)}
							style={{ all: 'unset' }}
						>
							<p>Запросить код повторно</p>
						</button>
					)}
				</div>
				<button type="submit" disabled={digits.some((digit) => digit === '')}>
					Продолжить
				</button>
			</form>
		</main>
	);
};

export default SMS;
