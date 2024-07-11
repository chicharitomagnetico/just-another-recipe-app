import { useState } from "react";
import { Button } from "./Button";
import { MedidasIniciales } from "./App";

export function FormaIngredientes({ onSetIngredientesActivos }) {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [unit, setUnit] = useState("gr");
	const [cost, setCost] = useState(0);

	function handleNewIngredient(e) {
		e.preventDefault();

		if (!name || quantity === 0 || !unit || cost === 0) {
			alert(
				"Asegurate que todos los campos del ingrediente están completos"
			);
			return;
		}

		const id = crypto.randomUUID();

		const newIngredient = {
			id: id,
			name: name,
			quantity: quantity,
			unit: unit,
			cost: cost,
		};

		onSetIngredientesActivos(newIngredient);

		setName("");
		setQuantity(0);
		setUnit("gr");
		setCost(0);
	}

	return (
		<div className="p-4 mt-4 bg-pink-100 rounded-md">
			<form
				className="flex items-end w-full gap-4 justify-evenly"
				onSubmit={handleNewIngredient}
			>
				<div className="w-full">
					<label className="text-sm text-pink-950">Ingrediente</label>
					<input
						type="text"
						placeholder="Nombre del ingrediente"
						className="w-full px-3 py-2 text-base rounded-lg"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="w-full">
					<label className="text-sm text-pink-950">Cantidad</label>
					<input
						type="number"
						placeholder="0"
						className="w-full px-3 py-2 text-base rounded-lg"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>
				{MedidasIniciales && (
					<div className="w-full">
						<label className="text-sm text-pink-950">Medida</label>
						<select
							className="w-full px-3 py-[10px] text-base rounded-lg"
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
						>
							{MedidasIniciales.map((medida) => (
								<option key={medida.id} value={medida.value}>
									{medida.name}
								</option>
							))}
						</select>
					</div>
				)}
				<div className="w-full">
					<label className="text-sm text-pink-950">Costo</label>
					<input
						type="number"
						placeholder="0"
						className="w-full px-3 py-2 text-base rounded-lg"
						value={cost}
						onChange={(e) => setCost(e.target.value)}
					/>
				</div>
				<Button
					color={"bg-rose-500 hover:bg-rose-600 text-white"}
					size={"small"}
				>
					<span className="flex items-center gap-2">
						<span>+</span> Agregar
					</span>
				</Button>
			</form>
		</div>
	);
}
