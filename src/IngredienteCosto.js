import { useState } from "react";
import { MedidasIniciales } from "./App";
import { Button } from "./Button";

export function IngredienteCosto({
	ingrediente,
	onEraseIngredienteFromCostos,
	onEditIngredientesActivos,
}) {
	const [editIngrediente, setEditIngrediente] = useState(false);
	const [costo, setCosto] = useState(ingrediente.cost);
	const [medida, setMedida] = useState(ingrediente.unit);
	const [quantity, setQuantity] = useState(ingrediente.quantity);

	function handleEditIngrediente() {
		setEditIngrediente((editIngrediente) => !editIngrediente);
	}

	function handleEraserIngrediente(ingrediente) {
		onEraseIngredienteFromCostos(ingrediente);
	}

	function handleIngredienteEditado(ingrediente) {
		console.log(ingrediente);

		if (!quantity || !medida || !costo) {
			alert(
				"Asegurate que todos los campos del ingrediente están completos"
			);
			return;
		}

		const ingredienteEditado = {
			...ingrediente,
			quantity: quantity,
			unit: medida,
			cost: costo,
		};

		onEditIngredientesActivos(ingredienteEditado);
	}

	return (
		<tr className="odd:bg-pink-100">
			<td className="p-3 border border-pink-200">{ingrediente.name}</td>
			{editIngrediente ? (
				<td className="p-3 border border-pink-200">
					<form
						className="flex items-end gap-4"
						onSubmit={(e) => {
							e.preventDefault(); // Prevent the default form submission behavior
							handleIngredienteEditado(ingrediente); // Call the first function with the ingrediente argument
							handleEditIngrediente(); // Then call the second function
						}}
					>
						<div className="flex flex-col">
							<label
								htmlFor="quantity"
								className="text-sm text-pink-950"
							>
								Cantidad
							</label>
							<input
								type="number"
								name="quantity"
								id="quantity"
								className="w-full px-3 py-2 text-base rounded-lg"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
							/>
						</div>
						{MedidasIniciales && (
							<div className="flex flex-col">
								<label
									htmlFor="unit"
									className="text-sm text-pink-950"
								>
									Unidad
								</label>
								<select
									name="unit"
									id="unit"
									className="w-full px-3 py-[10px] text-base rounded-lg"
									onChange={(e) => setMedida(e.target.value)}
									value={medida}
								>
									{MedidasIniciales.map((medida) => (
										<option
											key={medida.id}
											value={medida.value}
										>
											{medida.name}
										</option>
									))}
								</select>
							</div>
						)}
						<div className="flex flex-col">
							<label
								htmlFor="cost"
								className="text-sm text-pink-950"
							>
								Costo
							</label>
							<input
								type="number"
								name="cost"
								id="cost"
								className="w-full px-3 py-2 text-base rounded-lg"
								value={costo}
								onChange={(e) => setCosto(e.target.value)}
							/>
						</div>
						<Button
							color={"bg-rose-500 hover:bg-rose-600 text-white"}
							size={"small"}
						>
							<span className="flex items-center gap-2">
								<span>+</span> Guardar
							</span>
						</Button>
					</form>
				</td>
			) : (
				<td className="p-3 border border-pink-200">
					{ingrediente.quantity} {ingrediente.unit} / $
					{ingrediente.cost} mxn
				</td>
			)}
			<td className="p-3 border border-pink-200">
				<div className="flex justify-center gap-4">
					{editIngrediente ? (
						<button
							title="Cancelar"
							onClick={handleEditIngrediente}
						>
							❌
						</button>
					) : (
						<button title="Editar" onClick={handleEditIngrediente}>
							✏️
						</button>
					)}
					{!editIngrediente && (
						<button
							title="Borrar"
							onClick={() => handleEraserIngrediente(ingrediente)}
						>
							🗑
						</button>
					)}
				</div>
			</td>
		</tr>
	);
}
