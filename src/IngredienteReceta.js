export function IngredienteReceta({ ingredienteNuevo, onRemoveSelected }) {
	function handleRemove(e) {
		e.preventDefault();
		onRemoveSelected(ingredienteNuevo.id);
	}

	return (
		<>
			{ingredienteNuevo && (
				<div className="flex items-center justify-between gap-5 p-2 rounded-md bg-violet-50">
					<div>
						<h3 className="text-lg text-violet-900">
							{ingredienteNuevo?.quantity}
							{ingredienteNuevo?.unit}
							<span className="text-lg font-normal text-violet-700">
								{" "}
								{ingredienteNuevo?.name}
							</span>
						</h3>
					</div>
					<div className="flex justify-center gap-4">
						<button title="Editar">✏️</button>
						<button title="Borrar" onClick={handleRemove}>
							🗑
						</button>
					</div>
				</div>
			)}
		</>
	);
}
