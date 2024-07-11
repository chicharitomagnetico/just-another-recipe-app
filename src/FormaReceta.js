import { useState } from "react";
import { Button } from "./Button";

export function FormaReceta({ ingredientesActivos, onSeleccion }) {
	const [ingrediente, setIngrediente] = useState("");
	const [cantidad, setCantidad] = useState(0);
	const [medida, setMedida] = useState("gr");

	function handleOnSubmit(e) {
		e.preventDefault();

		if (ingrediente === "" || cantidad === 0 || medida === "") {
			return;
		}

		const seleccion = ingredientesActivos.filter(
			(ing) => ing.id === ingrediente
		);

		const id = crypto.randomUUID();

		const newIngredient = {
			id: id,
			name: seleccion[0].name,
			quantity: cantidad,
			unit: medida,
		};

		onSeleccion(newIngredient);

		setIngrediente("");
		setCantidad(0);
		setMedida("gr");
	}

	return (
		<div className="p-4 mt-4 rounded-md bg-violet-100">
			<form
				className="flex items-end w-full gap-4 justify-evenly"
				onSubmit={handleOnSubmit}
			>
				<div className="w-full">
					<label className="text-sm text-violet-800">
						Ingrediente
					</label>
					{ingredientesActivos.length > 0 ? (
						<select
							value={ingrediente}
							onChange={(e) =>
								setIngrediente(Number(e.target.value))
							}
							className="w-full px-3 py-[10px] rounded-lg text-violet-950"
						>
							<option value="">Seleccionar Ingrediente</option>
							{ingredientesActivos.map((ingrediente, index) => (
								<option key={index} value={ingrediente.id}>
									{ingrediente.name}
								</option>
							))}
						</select>
					) : (
						<input
							value={ingrediente}
							type="text"
							placeholder="No hay ingredientes"
							className="w-full px-3 py-2 rounded-lg text-violet-300"
							disabled
						/>
					)}
				</div>
				<div className="w-full">
					<label className="text-sm text-violet-800">Cantidad</label>
					<input
						type="number"
						placeholder="0"
						className="w-full px-3 py-2 rounded-lg text-violet-950"
						value={cantidad}
						onChange={(e) => setCantidad(Number(e.target.value))}
					/>
				</div>
				<div className="w-full">
					<label className="text-sm text-violet-800">Medida</label>
					<select
						value={medida}
						onChange={(e) => setMedida(e.target.value)}
						className="w-full px-3 py-[10px] rounded-lg text-violet-950"
					>
						<option value="gr">gr</option>
						<option value="mg">mg</option>
						<option value="kg">kg</option>
						<option value="ml">ml</option>
						<option value="pz">Pieza(s)</option>
						<option value="spoon">Cucharada(s)</option>
						<option value="cup">Taza(s)</option>
					</select>
				</div>
				<Button
					color={"bg-violet-600 hover:bg-violet-700 text-white"}
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
