import { IngredienteReceta } from "./IngredienteReceta";
import { TablaCostosCalculados } from "./TablaCostosCalculados";

export function IngredientesContainer({
	ingredientesAgregados,
	onRemoveSelected,
	selectedRecipe,
	costos,
	ingredientesCalculados,
	onEditIngredientesAg,
}) {
	return (
		<>
			{selectedRecipe && (
				<div>
					{ingredientesAgregados?.length > 0 ? (
						(console.log(ingredientesAgregados),
						(
							<>
								<h2 className="mb-2 text-xl font-bold text-violet-950">
									Ingredientes {selectedRecipe?.name}
								</h2>
								<div className="flex flex-col gap-1">
									{ingredientesAgregados.map(
										(ingredienteNuevo, index) => (
											<IngredienteReceta
												ingredienteNuevo={
													ingredienteNuevo
												}
												key={index}
												selectedRecipe={selectedRecipe}
												onRemoveSelected={
													onRemoveSelected
												}
												onEditIngredientesAg={
													onEditIngredientesAg
												}
												ingredientesAgregados={
													ingredientesAgregados
												}
											/>
										)
									)}
								</div>
								{ingredientesCalculados.length > 0 && (
									<div className="mt-5">
										<h2 className="mb-2 text-xl font-bold text-violet-950">
											Costos {selectedRecipe?.name}
										</h2>
										<div>
											<TablaCostosCalculados
												costos={costos}
												ingredientesCalculados={
													ingredientesCalculados
												}
											/>
										</div>
									</div>
								)}
							</>
						))
					) : (
						<>
							<div className="flex items-center gap-4">
								<div className="animate-bounce">👇</div>
								<h2 className="text-xl font-bold text-violet-950">
									Selecciona los ingredientes
								</h2>
								<div className="animate-bounce">👇</div>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
