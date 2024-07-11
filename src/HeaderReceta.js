import { useState } from "react";

export function HeaderReceta({ selectedRecipe, onHeaderSave }) {
	const [editMode, setEditMode] = useState(false);
	const [recipeName, setRecipeName] = useState(selectedRecipe?.name);
	const [recipeDescription, setRecipeDescription] = useState(
		selectedRecipe?.description
	);

	function handleSetEditMode() {
		setEditMode((editMode) => !editMode);
		setRecipeName(selectedRecipe.name);
		setRecipeDescription(selectedRecipe.description);
	}

	function handleSetSaved(e) {
		e.preventDefault();

		if (recipeName) {
			setRecipeName(recipeName);
		}

		if (recipeDescription) {
			setRecipeDescription(recipeDescription);
		}

		const changedRecipe = {
			...selectedRecipe,
			name: recipeName,
			description: recipeDescription,
		};

		onHeaderSave(changedRecipe);

		setEditMode((editMode) => !editMode);
	}

	return (
		<>
			{selectedRecipe ? (
				<>
					{!editMode ? (
						<div className="flex items-start justify-between gap-4 p-4 bg-white rounded-md">
							<div>
								<h2 className="text-xl font-bold text-violet-950">
									{selectedRecipe.name}
								</h2>
								<p className="text-violet-900">
									{selectedRecipe.description}
								</p>
							</div>
							<div className="flex gap-3">
								<button
									onClick={handleSetEditMode}
									title="Editar"
								>
									✏️
								</button>
							</div>
						</div>
					) : (
						<>
							<div className="flex items-start justify-between gap-4 p-4 bg-white rounded-md">
								<form
									onSubmit={handleSetSaved}
									className="flex items-start justify-between w-full gap-4"
								>
									<div>
										<input
											type="text"
											className="w-full px-3 py-2 mb-4 border rounded-lg text-violet-950 border-violet-100 bg-violet-50"
											value={recipeName}
											onChange={(e) =>
												setRecipeName(e.target.value)
											}
										/>
										<textarea
											className="w-full px-3 py-2 border rounded-lg text-violet-950 border-violet-100 bg-violet-50"
											value={recipeDescription}
											onChange={(e) =>
												setRecipeDescription(
													e.target.value
												)
											}
										/>
									</div>
									<button title="Guardar">💾</button>
								</form>

								{/* <button title="Borrar">🗑</button> */}
								<button
									onClick={handleSetEditMode}
									title="Cancelar"
								>
									❌
								</button>
							</div>
						</>
					)}
				</>
			) : (
				<div className="flex items-center justify-between h-full gap-4 p-4 bg-white rounded-md">
					<h2 className="w-full text-xl font-bold text-center text-violet-950">
						Selecciona una receta primero
					</h2>
				</div>
			)}
		</>
	);
}
