import { useEffect, useState } from "react";
import "./App.css";
import { Logo } from "./Logo";
import { Sidebar } from "./Sidebar";
import { AgregaIngredientes } from "./AgregaIngredientes";
import { RecetaContainer } from "./RecetaContainer";

export const MedidasIniciales = [
	{
		id: 1,
		name: "Gramo(s)",
		value: "gr",
	},
	{
		id: 2,
		name: "Kilo(s)",
		value: "kg",
	},
	{
		id: 3,
		name: "Litro(s)",
		value: "lt",
	},
	{
		id: 4,
		name: "Mililitro(s)",
		value: "ml",
	},
	{
		id: 5,
		name: "Pieza(s)",
		value: "pz",
	},
];

const initialIngredients = [
	{
		id: 1,
		name: "Huevo",
		quantity: 24,
		unit: "pz",
		cost: 64,
	},
	{
		id: 2,
		name: "Harina",
		quantity: 1,
		unit: "kg",
		cost: 22,
	},
	{
		id: 3,
		name: "Azúcar",
		quantity: 1,
		unit: "kg",
		cost: 45,
	},
	{
		id: 4,
		name: "Mantequilla",
		quantity: 300,
		unit: "gr",
		cost: 46,
	},
];

const initialRecetas = [
	{
		id: 1,
		name: "Pastel de Chocolate",
		description: "Un pastel de chocolate",
		image: "https://loremflickr.com/200/200/cake,cookie?lock=59",
		instructions:
			"Duis iaculis sed eros ut feugiat. Pellentesque sodales, leo et semper vulputate, velit tortor viverra urna, nec lobortis magna ante gravida enim. Praesent blandit ornare maximus. Fusce tincidunt a enim sit amet posuere. Quisque egestas dapibus nibh, varius bibendum turpis scelerisque sed. Aliquam rutrum, odio cursus dignissim tempus, nulla augue efficitur dolor, ut consequat lacus libero congue urna. Cras lectus felis, laoreet ac accumsan in, sagittis eu est. Mauris feugiat nisl ornare quam vehicula sagittis. Praesent efficitur diam non mi vulputate semper.",
		ingredients: [
			{
				id: 4,
				name: "Mantequilla",
				quantity: 500,
				unit: "gr",
			},
			{
				id: 3,
				name: "Azúcar",
				quantity: 500,
				unit: "gr",
			},
		],
	},
	{
		id: 2,
		name: "Pastel de Marmol",
		description: "Un pastel de vainilla y chocolate",
		image: "https://loremflickr.com/200/200/cake,cookie?lock=91",
		instructions:
			"Sed vitae pharetra leo. Mauris eu pretium est, id vehicula diam. Aliquam id maximus libero. Nullam auctor vehicula eros, non vehicula augue aliquam ut. Curabitur mollis mollis mi, sed tincidunt odio eleifend a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet viverra nibh. Fusce tincidunt ultricies diam id consectetur. Praesent lacinia ornare nisi at convallis. Praesent venenatis magna id nulla placerat, a gravida metus ultricies.",
		ingredients: [
			{
				id: 4,
				name: "Mantequilla",
				quantity: 500,
				unit: "gr",
			},
			{
				id: 2,
				name: "Harina",
				quantity: 500,
				unit: "gr",
			},
			{
				id: 1,
				name: "Huevo",
				quantity: 3,
				unit: "pz",
			},
		],
	},
	{
		id: 3,
		name: "Niño Envuelto",
		description: "Un pastel de vainilla con fresa",
		image: "https://loremflickr.com/200/200/cake,cookie?lock=720",
		instructions:
			"Quisque vestibulum turpis nec orci laoreet euismod. Phasellus pharetra elementum felis ac auctor. Sed dolor ipsum, consequat in tortor nec, vestibulum venenatis dui. Curabitur massa metus, rhoncus ut nisi at, rutrum dapibus neque. Duis ornare, justo at condimentum rutrum, nibh nulla condimentum justo, ac sodales elit dui sit amet libero. Maecenas pretium eros vitae elit pharetra iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec et nulla a orci viverra ultricies id sed metus. Aliquam vehicula faucibus dui ut efficitur.",
		ingredients: [
			{
				id: 4,
				name: "Mantequilla",
				quantity: 500,
				unit: "gr",
			},
			{
				id: 2,
				name: "Harina",
				quantity: 1.5,
				unit: "kg",
			},
			{
				id: 1,
				name: "Huevo",
				quantity: 5,
				unit: "pz",
			},
		],
	},
];

function getInitialIngredients() {
	return initialIngredients;
}
let ingredientesIniciales = getInitialIngredients();

function App() {
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [ingredientesActivos, setIngredientesActivos] = useState(
		ingredientesIniciales
	);
	const [ingredientesAgregados, setIngredientesAgregados] = useState([]);
	const [recetasIniciales, setRecetasIniciales] = useState(initialRecetas);
	const [ingCalculados, setIngCalculados] = useState([]);
	const [costos, setCostos] = useState(0);

	// useEffect(() => {
	// 	console.log(ingredientesAgregados);
	// }, [ingredientesAgregados]);

	function handleCalculation(receta) {
		if (!receta) return;
		// Get receta ingredients
		const recetaIngredients = receta.ingredients;
		// if (ingredientesAgregados.length > 0) {
		// 	// Add ingredients to the receta, setIngredienteAgregados is already set.
		// 	recetaIngredients = [
		// 		...recetaIngredients,
		// 		...ingredientesAgregados,
		// 	];
		// }

		const toCalculate = handleToCalculate(recetaIngredients);

		setIngCalculados(toCalculate);

		handleTotalCosts(toCalculate);
	}

	function handleToCalculate(ingredientes) {
		const toCalculate = ingredientes.map((ingrediente) => {
			const cost = costCalculator(ingrediente);
			return { ...ingrediente, cost };
		});

		return toCalculate;
	}

	function handleTotalCosts(toCalculate) {
		const totalCost = toCalculate.reduce(
			(acc, ingrediente) => acc + ingrediente.cost,
			0
		);

		setCostos(totalCost);
	}

	function grCalculator(ingrediente, toCalculate) {
		if (!ingrediente || !toCalculate) return;
		if (toCalculate.unit === "kg") {
			const costo = Number(
				ingrediente.quantity *
					(toCalculate.cost / (toCalculate.quantity * 1000))
			);
			return costo;
		} else {
			const costo = Number(
				ingrediente.quantity *
					(toCalculate.cost / (toCalculate.quantity * 0.001) / 1000)
			);

			return costo;
		}
	}

	function kgCalculator(ingrediente, toCalculate) {
		if (!ingrediente || !toCalculate) return;
		const costo = Number(
			(toCalculate.cost / toCalculate.quantity) * ingrediente.quantity
		);
		return costo;
	}

	function pzCalculator(ingrediente, toCalculate) {
		if (!ingrediente || !toCalculate) return;

		const costo = Number(
			(toCalculate.cost / toCalculate.quantity) * ingrediente.quantity
		);
		return costo;
	}

	function ltCalculator(ingrediente, toCalculate) {
		if (!ingrediente || !toCalculate) return;

		const costo = Number(
			(toCalculate.cost / toCalculate.quantity) * ingrediente.quantity
		);
		return costo;
	}

	function mlCalculator(ingrediente, toCalculate) {
		if (!ingrediente || !toCalculate) return;

		if (toCalculate.unit === "lt") {
			return Number(
				(ingrediente.quantity / (toCalculate.quantity * 1000)) *
					((toCalculate.cost / ingrediente.quantity) * 1000)
			);
		} else {
			return Number(
				(ingrediente.quantity / (toCalculate.quantity * 0.001)) *
					((toCalculate.cost / ingrediente.quantity) * 1000)
			);
		}
	}

	function costCalculator(ingrediente) {
		if (!ingrediente) return null;

		const toCalculater = ingredientesActivos.filter(
			(ing) => ing.name === ingrediente.name
		);
		const toCalculate = toCalculater[0];

		if (ingrediente.unit === "pz") {
			return pzCalculator(ingrediente, toCalculate);
		}

		if (ingrediente.unit === "kg") {
			return kgCalculator(ingrediente, toCalculate);
		}

		if (ingrediente.unit === "gr") {
			return grCalculator(ingrediente, toCalculate);
		}

		if (ingrediente.unit === "lt") {
			return ltCalculator(ingrediente, toCalculate);
		}

		if (ingrediente.unit === "ml") {
			return mlCalculator(ingrediente, toCalculate);
		}
	}

	function handleAddReceta(receta) {
		setRecetasIniciales((recetasIniciales) => [
			...recetasIniciales,
			receta,
		]);

		setSelectedRecipe(receta);
	}

	function handleBorrarReceta(recetaBorrarId) {
		setRecetasIniciales((recetas) =>
			recetas.filter((receta) => receta.id !== recetaBorrarId)
		);
		setSelectedRecipe(null);
	}

	// Runs when a recipe from the sidebar is selected.
	function handleSelectedRecipe(receta) {
		if (!receta) {
			return;
		}

		// // Remove selected recipe from the Receta view
		// setSelectedRecipe({ ...receta });
		// // Remove all ingredients from the Receta view
		setIngredientesAgregados([]);

		setSelectedRecipe(receta);
		if (!receta.ingredients) return;

		setIngredientesAgregados((seleccionado) => [
			...seleccionado,
			...receta.ingredients,
		]);

		handleCalculation(receta);
	}

	function handleOnSaveHeader(receta) {
		setSelectedRecipe(receta);
	}

	function handleOnSetIngredientesAgregados(ingrediente) {
		if (!ingrediente) return;

		// Check if ingrediente is already in the ingredientesAgregados list
		const exists = ingredientesAgregados.find(
			(ing) => ing.id === ingrediente.id
		);

		if (exists) {
			// Update the ingredient in the list of ingredientesAgregados
			const updatedIngredientesAgregados = ingredientesAgregados.map(
				(ing) =>
					ing.id === ingrediente.id
						? {
								...ing,
								quantity: ing.quantity + ingrediente.quantity,
						  }
						: ing
			);
			if (!updatedIngredientesAgregados) return;
			// Update ingredientesAgregados with updatedIngredientesAgregados
			setIngredientesAgregados(updatedIngredientesAgregados);

			const toCalculate = handleToCalculate(updatedIngredientesAgregados);

			setIngCalculados(toCalculate);

			handleTotalCosts(toCalculate);
		} else {
			setIngredientesAgregados((ingredientesExistentes) => [
				...ingredientesExistentes,
				ingrediente,
			]);
		}
	}

	function handleOnEditIngredientesAgregados(
		ingredienteEditado,
		selectedRecipe
	) {
		console.log(ingredienteEditado);
		// Update the ingredient in the list of selectedRecipe ingredients
		selectedRecipe.ingredients = selectedRecipe.ingredients.map(
			(ingrediente) =>
				ingrediente.id === ingredienteEditado.id
					? ingredienteEditado
					: ingrediente
		);

		const editedIngredients = selectedRecipe.ingredients;

		const toCalculate = handleToCalculate(editedIngredients);

		setIngCalculados(toCalculate);

		handleTotalCosts(toCalculate);

		setIngredientesAgregados(editedIngredients);
	}

	// When an ingredient is removed from the list of ingredienteAgregados (selectedRecipe.ingredients)
	function handleOnRemoveIngredientesAgregados(
		ingredienteBorrado,
		selectedRecipe
	) {
		// Erase ingredienteBorrado from ingredientesAgreagados
		selectedRecipe.ingredients = selectedRecipe.ingredients.filter(
			(ingrediente) => ingrediente.id !== ingredienteBorrado
		);

		setSelectedRecipe(selectedRecipe);

		const selectedAgregados = selectedRecipe.ingredients;

		const toCalculate = handleToCalculate(selectedAgregados);

		setIngCalculados(toCalculate);

		handleTotalCosts(toCalculate);

		setIngredientesAgregados(selectedAgregados);
	}

	function handleOnSetIngredientesActivos(ingredientes) {
		ingredientesIniciales = ingredientes;

		setIngredientesActivos(ingredientes);

		// handleCalculation(selectedRecipe);
		const toCalculate = ingredientes.map((ingrediente) => {
			const cost = costCalculator(ingrediente);
			return { ...ingrediente, cost };
		});

		setIngCalculados(toCalculate);

		handleTotalCosts(toCalculate);
	}

	return (
		<div className="px-5 mx-auto mb-8 max-w-screen-2xl">
			<Logo />
			<div className="grid w-full grid-cols-4 gap-8 mx-auto min-h-[50vh]">
				<div className="flex flex-col justify-between col-span-1 gap-5 p-3 rounded-md bg-slate-100">
					<Sidebar
						onSelectedRecipe={handleSelectedRecipe}
						recetasIniciales={recetasIniciales}
						onSetRecetas={handleAddReceta}
						onBorrarReceta={handleBorrarReceta}
						selectedRecipe={selectedRecipe}
					/>
				</div>
				<div className="col-span-3 p-3 rounded-md bg-violet-200">
					<RecetaContainer
						ingredientesAgregados={ingredientesAgregados}
						onSetIngredientesAgreagados={
							handleOnSetIngredientesAgregados
						}
						onEditIngredientesAgregados={
							handleOnEditIngredientesAgregados
						}
						onRemoveIngredientesAgregados={
							handleOnRemoveIngredientesAgregados
						}
						selectedRecipe={selectedRecipe}
						ingredientesActivos={ingredientesActivos}
						onHeaderSave={handleOnSaveHeader}
						costos={costos}
						ingredientesCalculados={ingCalculados}
						onHandleCalculation={handleCalculation}
					/>
				</div>
			</div>
			<AgregaIngredientes
				ingredientesActivos={ingredientesActivos}
				onSetIngredientesActivos={handleOnSetIngredientesActivos}
			/>
		</div>
	);
}

export default App;
