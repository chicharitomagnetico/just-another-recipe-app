export function Button({ children, size, color, width, onClick }) {
	return (
		<button
			onClick={onClick}
			className={`${
				size === "big" ? "px-4 py-3 rounded-lg" : "px-4 py-2 rounded-xl"
			} transition-colors duration-100 font-sans font-bold ${
				color ? color : ""
			} ${width === "full" ? "w-full" : ""}`}
		>
			{children}
		</button>
	);
}
