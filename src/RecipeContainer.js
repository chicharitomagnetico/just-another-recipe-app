export function RecipeContainer({
	receta,
	removeReceta,
	onSelectedRecipe,
	selectedRecipe,
	onHandleCalculation,
}) {
	function handleRemoveReceta() {
		removeReceta(receta.id);
	}

	function handleSelectedRecipe() {
		onSelectedRecipe(receta);
		onHandleCalculation(receta);
	}

	return (
		<li>
			<div
				className={`flex p-2 rounded-md ${
					receta?.id === selectedRecipe?.id
						? "bg-violet-50"
						: "bg-slate-100"
				} hover:bg-violet-50`}
			>
				<div className="w-1/4 overflow-hidden rounded cursor-pointer">
					<img
						src={receta.image}
						alt={receta.name}
						width="200"
						height="200"
					/>
				</div>
				<div className="flex justify-between w-3/4 gap-2 pl-2">
					<div>
						<p
							className="font-bold cursor-pointer hover:text-violet-500"
							onClick={handleSelectedRecipe}
						>
							{receta?.id === selectedRecipe?.id
								? selectedRecipe.name
									? selectedRecipe.name
									: receta.name
								: receta.name}
						</p>
						<p
							className="cursor-pointer hover:text-violet-500"
							onClick={handleSelectedRecipe}
						>
							{receta?.id === selectedRecipe?.id
								? selectedRecipe.description
									? selectedRecipe.description
									: receta.description
								: receta.description}
						</p>
					</div>
					<div>
						<button
							onClick={handleRemoveReceta}
							className="text-sm"
							title="Borrar receta"
						>
							<span>🗑</span>
						</button>
					</div>
				</div>
			</div>
		</li>
	);
}
