import { RecipeContainer } from "./RecipeContainer";

export function RecipeList({
	recetasIniciales,
	removeReceta,
	onSelectedRecipe,
	selectedRecipe,
	onHandleCalculation,
}) {
	return (
		<ul className="flex flex-col gap-2">
			{recetasIniciales.map((receta) => (
				<RecipeContainer
					receta={receta}
					key={receta.id}
					removeReceta={removeReceta}
					onSelectedRecipe={onSelectedRecipe}
					selectedRecipe={selectedRecipe}
					onHandleCalculation={onHandleCalculation}
				/>
			))}
		</ul>
	);
}
