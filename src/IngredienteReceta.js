import { useState } from "react";

export function IngredienteReceta({
	ingredienteNuevo,
	onRemoveSelected,
	selectedRecipe,
	onEditIngredientesAg,
}) {
	const [editMode, setEditMode] = useState(false);
	const [ingrediente, setIngrediente] = useState(ingredienteNuevo);
	const [cantidad, setCantidad] = useState(ingredienteNuevo?.quantity);

	function handleEditMode(ingredienteNuevo) {
		if (!editMode) {
			setIngrediente(ingredienteNuevo);
			setCantidad(ingredienteNuevo.quantity);
		}

		setEditMode((editMode) => !editMode);
	}

	function handleRemove(ingredienteNuevo, selectedRecipe) {
		onRemoveSelected(ingredienteNuevo.id, selectedRecipe);
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (!cantidad) {
			alert("Asegurate de que la cantidad no esté vacía");
			return;
		}

		const ingredienteEditado = {
			...ingredienteNuevo,
			quantity: Number(cantidad),
		};

		setIngrediente(ingredienteEditado);
		setCantidad(ingredienteEditado.quantity);

		handleEdit(ingredienteEditado, selectedRecipe);

		setEditMode((editMode) => !editMode);
	}

	function handleEdit(ingredienteNuevo, selectedRecipe) {
		onEditIngredientesAg(ingredienteNuevo, selectedRecipe);
	}

	return (
		<>
			{ingredienteNuevo && (
				<div className="flex items-center justify-between gap-5 p-2 rounded-md bg-violet-50">
					<div>
						{editMode ? (
							<form
								className="flex gap-4"
								onSubmit={handleSubmit}
							>
								<div>
									<input
										type="number"
										value={cantidad}
										className="w-full px-3 py-2 text-base rounded-lg text-violet-900"
										onChange={(e) =>
											setCantidad(e.target.value)
										}
									/>
								</div>
								<div>
									<input
										type="text"
										placeholder={ingrediente?.unit}
										className="w-full px-3 py-2 pl-0 text-base rounded-lg text-violet-900 placeholder:text-violet-900"
										disabled
									/>
								</div>
								<div>
									<input
										type="text"
										value={ingrediente?.name}
										className="w-full px-3 py-2 pl-0 text-base rounded-lg text-violet-900"
										readOnly
										disabled
										onChange={(e) =>
											setIngrediente(e.target.value)
										}
									/>
								</div>
								<button title="Guardar">💾</button>
							</form>
						) : (
							<h3 className="text-lg text-violet-900">
								{ingredienteNuevo?.quantity}
								{ingredienteNuevo?.unit}
								<span className="text-lg font-normal text-violet-700">
									{" "}
									{ingredienteNuevo?.name}
								</span>
							</h3>
						)}
					</div>
					<div className="flex justify-center gap-4">
						{!editMode ? (
							<>
								<button
									title="Editar"
									onClick={() =>
										handleEditMode(ingredienteNuevo)
									}
								>
									✏️
								</button>
								<button
									title="Borrar"
									onClick={() =>
										handleRemove(
											ingredienteNuevo,
											selectedRecipe
										)
									}
								>
									🗑
								</button>
							</>
						) : (
							<button title="Cancelar" onClick={handleEditMode}>
								❌
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
}
