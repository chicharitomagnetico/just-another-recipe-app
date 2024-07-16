import { useState } from "react";
import { Button } from "./Button";
import { NuevaReceta } from "./NuevaReceta";
import { RecipeList } from "./RecipeList";

export function Sidebar({
	onSelectedRecipe,
	recetasIniciales,
	onSetRecetas,
	onBorrarReceta,
	selectedRecipe,
}) {
	const [agregarReceta, setAgregarReceta] = useState(false);

	function onHandleRecetas(receta) {
		onSetRecetas(receta);
	}

	function handleBorrarReceta(recetaBorrarId) {
		onBorrarReceta(recetaBorrarId);
	}

	function handleAgregarReceta() {
		setAgregarReceta((agregarReceta) => !agregarReceta);
	}
	return (
		<>
			<div className="p-3 bg-white rounded-md">
				<h3 className="mb-2 font-sans text-lg font-bold text-slate-950">
					{recetasIniciales.length > 0
						? "Recetas"
						: "Agrega tus recetas 👇"}
				</h3>
				<div className="flex flex-col gap-2">
					<RecipeList
						recetasIniciales={recetasIniciales}
						removeReceta={handleBorrarReceta}
						onSelectedRecipe={onSelectedRecipe}
						selectedRecipe={selectedRecipe}
					/>
				</div>
			</div>
			<div>
				{agregarReceta && (
					<NuevaReceta
						setAgregarReceta={setAgregarReceta}
						onNuevaReceta={onHandleRecetas}
					/>
				)}
				{!agregarReceta && (
					<Button
						onClick={handleAgregarReceta}
						color={"bg-slate-950 hover:bg-slate-700 text-white"}
						size={"big"}
						width={"full"}
					>
						Agregar Receta
					</Button>
				)}
			</div>
		</>
	);
}
