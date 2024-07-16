import { useState } from "react";
import { HeaderReceta } from "./HeaderReceta";
import { FormaReceta } from "./FormaReceta";
import { IngredientesContainer } from "./IngredientesContainer";

export function RecetaContainer({
	selectedRecipe,
	ingredientesAgregados,
	onSetIngredientesAgreagados,
	onEditIngredientesAgregados,
	onRemoveIngredientesAgregados,
	ingredientesActivos,
	onHeaderSave,
	costos,
	ingredientesCalculados,
}) {
	const [editMode, setEditMode] = useState(false);
	const [recipeInstructions, setRecipeInstructions] = useState(
		selectedRecipe?.instructions
	);

	function handleEditMode() {
		setEditMode((editMode) => !editMode);
		setRecipeInstructions(selectedRecipe?.instructions);
	}

	function handleSetSaved(e) {
		e.preventDefault();

		if (recipeInstructions) {
			setRecipeInstructions(recipeInstructions);
		}

		const changedInstructions = {
			...selectedRecipe,
			instructions: recipeInstructions,
		};

		onHeaderSave(changedInstructions);

		setEditMode((editMode) => !editMode);
	}

	// Add a new ingredient to the list of selectedRecipe ingredients
	function handleSeleccion(seleccionado, selectedRecipe) {
		onSetIngredientesAgreagados(seleccionado, selectedRecipe);
	}

	function handleRemoveSelected(borrado, selectedRecipe) {
		// Borrado is the ID of the ingredient to remove
		onRemoveIngredientesAgregados(borrado, selectedRecipe);
	}

	function handleEditIngredientesAgregados(
		ingredienteEditado,
		selectedRecipe
	) {
		onEditIngredientesAgregados(ingredienteEditado, selectedRecipe);
	}

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<HeaderReceta
				selectedRecipe={selectedRecipe}
				onHeaderSave={onHeaderSave}
			/>

			{selectedRecipe && (
				<>
					<div className="grid h-full grid-cols-1 gap-6 p-3 mt-4 bg-white rounded-md md:grid-cols-2">
						<IngredientesContainer
							ingredientesAgregados={ingredientesAgregados}
							onRemoveSelected={handleRemoveSelected}
							selectedRecipe={selectedRecipe}
							costos={costos}
							ingredientesCalculados={ingredientesCalculados}
							ingredientesActivos={ingredientesActivos}
							onEditIngredientesAg={
								handleEditIngredientesAgregados
							}
						/>
						{selectedRecipe && (
							<div>
								<div className="prose">
									{!editMode && (
										<>
											<div className="inline-flex items-baseline justify-between w-full gap-4">
												<h2 className="mb-2 text-xl font-bold text-violet-950 line-clamp-1">
													Instrucciones
												</h2>
												<button
													onClick={handleEditMode}
													title="edit"
												>
													✏️
												</button>
											</div>
											<div className="prose text-violet-900">
												<p>
													{
														selectedRecipe.instructions
													}
												</p>
											</div>
										</>
									)}
								</div>
								{!editMode ? (
									<></>
								) : (
									<div>
										<form onSubmit={handleSetSaved}>
											<div className="inline-flex items-baseline justify-between w-full gap-4">
												<h2 className="mb-2 text-xl font-bold text-violet-950 line-clamp-1">
													Editar Instrucciones
												</h2>
												<button title="Guardar">
													💾
												</button>
											</div>
											<textarea
												rows="12"
												className="w-full px-3 py-2 border rounded-lg text-violet-950 border-violet-100 bg-violet-50"
												value={recipeInstructions}
												onChange={(e) =>
													setRecipeInstructions(
														e.target.value
													)
												}
											/>
										</form>
									</div>
								)}
							</div>
						)}
					</div>

					<FormaReceta
						ingredientesActivos={ingredientesActivos}
						onSeleccion={handleSeleccion}
					/>
				</>
			)}
		</div>
	);
}
