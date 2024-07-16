import { useState } from "react";
import { Button } from "./Button";

const medidasDisponiblesInit = [
	{ id: 1, value: "gr", name: "gr" },
	{ id: 2, value: "mg", name: "mg" },
	{ id: 3, value: "kg", name: "kg" },
	{ id: 4, value: "ml", name: "ml" },
	{ id: 5, value: "pz", name: "Pieza(s)" },
	{ id: 6, value: "spoon", name: "Cucharada(s)" },
	{ id: 7, value: "cup", name: "Taza(s)" },
];

export function FormaReceta({ ingredientesActivos, onSeleccion }) {
	const [ingrediente, setIngrediente] = useState("");
	const [cantidad, setCantidad] = useState(0);
	const [medida, setMedida] = useState("gr");
	const [medidasDisponibles, setMedidasDisponibles] = useState(
		medidasDisponiblesInit
	);

	const handleSetMedida = (e) => {
		setMedida(e.target.value);
	};

	function handleOnSubmit(e) {
		e.preventDefault();

		if (ingrediente === "" || cantidad === 0 || medida === "") {
			return;
		}

		const seleccion = ingredientesActivos.filter(
			(ing) => ing.id === ingrediente
		);

		// const id = crypto.randomUUID();

		const newIngredient = {
			id: seleccion[0].id,
			name: seleccion[0].name,
			quantity: cantidad,
			unit: medida,
		};

		onSeleccion(newIngredient);

		setIngrediente("");
		setCantidad(0);
		setMedidasDisponibles(medidasDisponiblesInit);
		setMedida("gr");
	}

	function handleSeleccion(ingrediente) {
		if (ingrediente === "") {
			return;
		}

		// Search for the selected ingredient in the list of active ingredients
		const seleccion = ingredientesActivos.filter(
			(ing) => ing.id === ingrediente
		);

		// If the seleccion.unit is === 'pz', set the medidasDisponibles to 'pz'
		if (seleccion[0].unit === "pz") {
			setMedida("pz");
			setMedidasDisponibles([{ id: 5, value: "pz", name: "Pieza(s)" }]);
		} else if (seleccion[0].unit === "gr") {
			setMedida("gr");
			setMedidasDisponibles([
				{ id: 1, value: "gr", name: "gr" },
				{ id: 2, value: "mg", name: "mg" },
				{ id: 3, value: "kg", name: "kg" },
			]);
		} else if (seleccion[0].unit === "mg") {
			setMedida("mg");
			setMedidasDisponibles([
				{ id: 2, value: "mg", name: "mg" },
				{ id: 1, value: "gr", name: "gr" },
				{ id: 3, value: "kg", name: "kg" },
			]);
		} else if (seleccion[0].unit === "kg") {
			setMedida("kg");
			setMedidasDisponibles([
				{ id: 3, value: "kg", name: "kg" },
				{ id: 1, value: "gr", name: "gr" },
				{ id: 2, value: "mg", name: "mg" },
			]);
		} else if (seleccion[0].unit === "ml") {
			setMedida("ml");
			setMedidasDisponibles([
				{ id: 4, value: "ml", name: "ml" },
				{ id: 7, value: "cup", name: "Taza(s)" },
			]);
		} else if (seleccion[0].unit === "spoon") {
			setMedida("spoon");
			setMedidasDisponibles([
				{ id: 6, value: "spoon", name: "Cucharada(s)" },
			]);
		} else if (seleccion[0].unit === "cup") {
			setMedida("cup");
			setMedidasDisponibles([{ id: 7, value: "cup", name: "Taza(s)" }]);
		} else {
			setMedidasDisponibles(medidasDisponiblesInit);
		}

		setIngrediente(ingrediente);
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
								handleSeleccion(Number(e.target.value))
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
						onChange={handleSetMedida}
						className="w-full px-3 py-[10px] rounded-lg text-violet-950"
					>
						{medidasDisponibles.map((medida) => (
							<option key={medida.id} value={medida.value}>
								{medida.name}
							</option>
						))}
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
