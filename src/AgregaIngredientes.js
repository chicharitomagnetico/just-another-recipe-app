import { FormaIngredientes } from "./FormaIngredientes";
import { ListaIngredientesCostos } from "./ListaIngredientesCostos";

export function AgregaIngredientes({
	ingredientesActivos,
	onSetIngredientesActivos,
}) {
	function handleSetIngredientesActivos(nuevoIngrediente) {
		onSetIngredientesActivos((ingredientesActivos) => [
			...ingredientesActivos,
			nuevoIngrediente,
		]);
	}

	function handleEraseIngredienteFromCostos(ingredienteBorrado) {
		if (!ingredienteBorrado) return;

		const confirm = window.confirm(
			"¿Estás seguro de borrar este ingrediente? 🤔"
		);
		if (!confirm) return;

		onSetIngredientesActivos(
			ingredientesActivos.filter(
				(ingrediente) => ingrediente.id !== ingredienteBorrado.id
			)
		);
	}

	function handleOnEditIngredientesActivos(ingredienteEditado) {
		// Search for ingredienteEditado in ingredientesActivos
		const ingredientesActivosCopy = [...ingredientesActivos];
		const index = ingredientesActivosCopy.findIndex(
			(ingrediente) => ingrediente.id === ingredienteEditado.id
		);
		// Replace the ingrediente with the ingredienteEditado
		ingredientesActivosCopy[index] = ingredienteEditado;
		// Set the new ingredientesActivos
		onSetIngredientesActivos(ingredientesActivosCopy);
	}

	return (
		<div className="w-full p-4 mt-6 bg-pink-300 rounded-md text-slate-950">
			<div className="p-4 rounded-md bg-pink-50">
				<h2 className="mb-4 text-3xl font-bold text-center">
					🥚 Costos por ingrediente 🥚
				</h2>
				<ListaIngredientesCostos
					ingredientesActivos={ingredientesActivos}
					onEraseIngredienteFromCostos={
						handleEraseIngredienteFromCostos
					}
					onEditIngredientesActivos={handleOnEditIngredientesActivos}
				/>
			</div>
			<FormaIngredientes
				onSetIngredientesActivos={handleSetIngredientesActivos}
			/>
		</div>
	);
}
