export const LoadingIcon = ({...rest}) => (
	<svg
		width="56"
		height="56"
		viewBox="0 0 56 56"
		fill="none"
		{...rest}
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient id="loadingGradient" x1="1" y1="0" x2="0" y2="1">
				<stop offset="0%" stopColor="#343434" stopOpacity="1" />
				<stop offset="20%" stopColor="#343434" stopOpacity="1" />
				<stop offset="100%" stopColor="#fff" stopOpacity="0" />
			</linearGradient>
		</defs>

		<circle
			cx="28"
			cy="28"
			r="27"
			stroke="#343434"
			strokeOpacity="0.2"
			strokeWidth="2"
		/>

		<path
			d="M 28 2 A 26 26 0 1 1 27.99 2"
			stroke="url(#loadingGradient)"
			strokeWidth="3"
			fill="none"
			strokeLinecap="round"
		>
			<animateTransform
				attributeName="transform"
				attributeType="XML"
				type="rotate"
				from="0 28 28"
				to="3000 28 28"
				dur="5s"
				repeatCount="indefinite"
			/>
		</path>
	</svg>
);
