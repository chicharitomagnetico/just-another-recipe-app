import { IngredienteCosto } from "./IngredienteCosto";

export function ListaIngredientesCostos({
	ingredientesActivos,
	onEraseIngredienteFromCostos,
	onEditIngredientesActivos,
}) {
	return (
		<table className="w-full border border-collapse border-pink-200 shadow-sm table-auto">
			<thead className="bg-pink-200">
				<tr>
					<th className="p-3 text-left border border-pink-200">
						Nombre
					</th>
					<th className="p-3 text-left border border-pink-200">
						Costo
					</th>
					<th className="p-3 border border-pink-200 w-44">⚙</th>
				</tr>
			</thead>
			<tbody>
				{ingredientesActivos.map((ingrediente) => (
					<IngredienteCosto
						ingrediente={ingrediente}
						key={ingrediente.id}
						onEraseIngredienteFromCostos={
							onEraseIngredienteFromCostos
						}
						onEditIngredientesActivos={onEditIngredientesActivos}
					/>
				))}
			</tbody>
		</table>
	);
}
