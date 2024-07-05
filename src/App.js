import { useState } from "react";
import "./App.css";

const initialIngredients = [
	{
		id: 1,
		name: "Huevo",
		quantity: 1,
		unit: "kg",
		cost: 10,
	},
	{
		id: 2,
		name: "Harina",
		quantity: 1,
		unit: "kg",
		cost: 8,
	},
	{
		id: 3,
		name: "Azúcar",
		quantity: 1,
		unit: "kg",
		cost: 12,
	},
	{
		id: 4,
		name: "Mantequilla",
		quantity: 300,
		unit: "gr",
		cost: 9,
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
				quantity: 1,
				unit: "kg",
			},
			{
				id: 1,
				name: "Huevo",
				quantity: 3,
				unit: "pz",
			},
		],
	},
];

function App() {
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [ingredientes, setIngredientes] = useState(initialIngredients);
	const [seleccion, setSeleccion] = useState([]);

	function handleSelectedRecipe(receta) {
		console.log(receta);
		console.log(receta.ingredients);
		setSelectedRecipe(receta);
		setSeleccion((seleccionado) => [
			...seleccionado,
			...receta.ingredients,
		]);
	}

	return (
		<div className="px-5 mx-auto mb-8 max-w-screen-2xl">
			<Logo />
			<div className="grid w-full grid-cols-4 gap-8 mx-auto min-h-[50vh]">
				<div className="flex flex-col justify-between col-span-1 gap-5 p-3 rounded-md bg-slate-100">
					<Sidebar onSelectedRecipe={handleSelectedRecipe} />
				</div>
				<div className="col-span-3 p-3 rounded-md bg-violet-200">
					<RecetaContainer
						seleccion={seleccion}
						onSetSeleccion={setSeleccion}
						selectedRecipe={selectedRecipe}
						ingredientes={ingredientes}
					/>
				</div>
			</div>
			<AgregaIngredientes
				ingredientes={ingredientes}
				onSetIngredientes={setIngredientes}
			/>
		</div>
	);
}

export default App;

function Logo() {
	return (
		<>
			<div className="my-6 text-center">
				<h1 className="font-sans text-6xl font-bold ">🍩 Recetas 🍪</h1>
			</div>
		</>
	);
}

function Sidebar({ onSelectedRecipe }) {
	const [agregarReceta, setAgregarReceta] = useState(false);
	const [recetas, setRecetas] = useState(initialRecetas);

	function handleAddReceta(receta) {
		setRecetas((recetas) => [...recetas, receta]);
	}

	function borrarReceta(recetaBorrarId) {
		setRecetas((recetas) =>
			recetas.filter((receta) => receta.id !== recetaBorrarId)
		);
	}

	function handleAgregarReceta() {
		setAgregarReceta((agregarReceta) => !agregarReceta);
	}
	return (
		<>
			<div className="p-3 bg-white rounded-md">
				<h3 className="mb-2 font-sans text-lg font-bold">
					{recetas.length > 0 ? "Recetas" : "Agrega tus recetas 👇"}
				</h3>
				<div className="flex flex-col gap-2">
					<RecipeList
						recetas={recetas}
						removeReceta={borrarReceta}
						onSelectedRecipe={onSelectedRecipe}
					/>
				</div>
			</div>
			<div>
				{agregarReceta && (
					<NuevaReceta
						setAgregarReceta={setAgregarReceta}
						onNuevaReceta={handleAddReceta}
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

function NuevaReceta({ setAgregarReceta, onNuevaReceta }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(
		"https://loremflickr.com/200/200/cake,cookie/all"
	);

	function handleFormSubmit(e) {
		e.preventDefault();

		if (!name || !image) return;

		const id = crypto.randomUUID();

		const newReceta = {
			name: name,
			description: description,
			image: `${image}?random${id}`,
			id: id,
		};

		onNuevaReceta(newReceta);

		setName("");
		setDescription("");
		setImage("https://loremflickr.com/200/200/cake,cookie/all");

		setAgregarReceta(false);
	}

	function handleClose() {
		setAgregarReceta((setAgregarReceta) => !setAgregarReceta);
	}

	return (
		<div>
			<Button
				onClick={handleClose}
				color={"bg-slate-950 hover:bg-slate-700 text-white"}
				size={"big"}
				width={"full"}
			>
				Close
			</Button>

			<div className="p-4 mt-4 rounded-md bg-slate-300">
				<h3 className="mb-2 font-sans text-xl font-bold">
					Nueva Receta
				</h3>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleFormSubmit}
				>
					<input
						type="text"
						placeholder="Nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full px-3 py-2 rounded-lg"
					/>
					<textarea
						placeholder="Descripción"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full px-3 py-2 rounded-lg"
					/>
					<input
						tupe="text"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						className="w-full px-3 py-2 rounded-lg"
					/>
					<Button
						color={"bg-cyan-500 hover:bg-cyan-600 text-slate-900"}
						size={"big"}
						width={"full"}
					>
						Agregar
					</Button>
				</form>
			</div>
		</div>
	);
}

function RecipeContainer({ receta, removeReceta, onSelectedRecipe }) {
	function handleRemoveReceta() {
		removeReceta(receta.id);
	}

	function handleSelectedRecipe() {
		onSelectedRecipe(receta);
	}

	return (
		<li>
			<div className="flex p-2 rounded-md bg-slate-100 hover:bg-cyan-50">
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
							className="font-bold cursor-pointer line-clamp-1 hover:text-indigo-500"
							onClick={handleSelectedRecipe}
						>
							{receta.name}
						</p>
						<p className="line-clamp-2">{receta.description}</p>
					</div>
					<div>
						<button
							onClick={handleRemoveReceta}
							className="text-sm"
							title="Borrar receta"
						>
							<span>❌</span>
						</button>
					</div>
				</div>
			</div>
		</li>
	);
}

function RecipeList({ recetas, removeReceta, onSelectedRecipe }) {
	return (
		<ul className="flex flex-col gap-2">
			{recetas.map((receta) => (
				<RecipeContainer
					receta={receta}
					key={receta.id}
					removeReceta={removeReceta}
					onSelectedRecipe={onSelectedRecipe}
				/>
			))}
		</ul>
	);
}

function RecetaContainer({
	selectedRecipe,
	ingredientes,
	seleccion,
	onSetSeleccion,
}) {
	console.log("selected " + selectedRecipe);
	console.log("seleccion " + seleccion);

	function handleSeleccion(seleccionado) {
		onSetSeleccion((seleccion) => [...seleccion, seleccionado]);
	}

	function handleRemoveSelected(borrado) {
		onSetSeleccion(seleccion.filter((sel) => sel.id !== borrado));
	}

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<HeaderReceta selectedRecipe={selectedRecipe} />

			<div className="grid h-full grid-cols-1 gap-6 p-3 mt-4 bg-white rounded-md md:grid-cols-2">
				<IngredientesContainer
					seleccion={seleccion}
					onRemoveSelected={handleRemoveSelected}
					selectedRecipe={selectedRecipe}
				/>
				<div className="prose">
					<h2 className="mb-2 text-xl font-bold text-violet-950">
						Descripción
					</h2>
					<p className="text-violet-900">uno</p>
				</div>
			</div>

			<FormaReceta
				ingredientes={ingredientes}
				onSeleccion={handleSeleccion}
			/>
		</div>
	);
}

function HeaderReceta({ selectedRecipe }) {
	const [editMode, setEditMode] = useState(false);
	const [saved, setSaved] = useState(false);

	function handleSetEditMode() {
		setEditMode((editMode) => !editMode);
	}

	function handleSetSaved() {
		setSaved((saved) => !saved);
		// setSaved
	}

	return (
		<>
			<div className="flex items-center justify-between gap-4 p-4 bg-white rounded-md">
				{selectedRecipe ? (
					<>
						<div>
							<h2 className="text-xl font-bold text-violet-950">
								{selectedRecipe.name}
							</h2>
							<p className="text-violet-900">
								{selectedRecipe.description}
							</p>
						</div>
						<div className="flex gap-3">
							{!editMode && (
								<button
									onClick={handleSetEditMode}
									title="Editar"
								>
									✏️
								</button>
							)}

							{editMode && (
								<>
									<button
										onClick={handleSetEditMode}
										title="Guardar"
									>
										💾
									</button>
									<button title="Borrar">🗑</button>
									<button
										onClick={handleSetEditMode}
										title="Cancelar"
									>
										⛔️
									</button>
								</>
							)}
						</div>
					</>
				) : (
					<div>
						<h2 className="text-xl font-bold text-violet-950">
							Selecciona una receta primero
						</h2>
					</div>
				)}
			</div>
		</>
	);
}

function Button({ children, size, color, width, onClick }) {
	return (
		<button
			onClick={onClick}
			className={`${
				size === "big" ? "px-4 py-3 rounded-lg" : "px-4 py-2 rounded-xl"
			} transition-colors duration-100 font-sans font-bold ${
				color ? color : ""
			} ${width === "full" ? "w-full" : ""}`}
		>
			{children}
		</button>
	);
}

function FormaReceta({ ingredientes, onSeleccion }) {
	const [ingrediente, setIngrediente] = useState("");
	const [cantidad, setCantidad] = useState(0);
	const [medida, setMedida] = useState("gr");

	function handleOnSubmit(e) {
		e.preventDefault();

		if (ingrediente === "" || cantidad === 0 || medida === "") {
			return;
		}

		const seleccion = ingredientes.filter((ing) => ing.id === ingrediente);

		const id = crypto.randomUUID();

		const newIngredient = {
			id: id,
			name: seleccion[0].name,
			quantity: cantidad,
			unit: medida,
		};

		onSeleccion(newIngredient);

		setIngrediente("");
		setCantidad(0);
		setMedida("gr");
	}

	return (
		<div className="p-4 mt-4 rounded-md bg-violet-100">
			<form
				className="flex items-end w-full gap-4 justify-evenly"
				onSubmit={handleOnSubmit}
			>
				<div className="w-full">
					<label className="text-sm text-violet-800">
						Ingrediente
					</label>
					{ingredientes.length > 0 ? (
						<select
							value={ingrediente}
							onChange={(e) =>
								setIngrediente(Number(e.target.value))
							}
							className="w-full px-3 py-[10px] rounded-lg text-violet-950"
						>
							<option value="">Seleccionar Ingrediente</option>
							{ingredientes.map((ingrediente, index) => (
								<option key={index} value={ingrediente.id}>
									{ingrediente.name}
								</option>
							))}
						</select>
					) : (
						<input
							value={ingrediente}
							type="text"
							placeholder="No hay ingredientes"
							className="w-full px-3 py-2 rounded-lg text-violet-300"
							disabled
						/>
					)}
				</div>
				<div className="w-full">
					<label className="text-sm text-violet-800">Cantidad</label>
					<input
						type="number"
						placeholder="0"
						className="w-full px-3 py-2 rounded-lg text-violet-950"
						value={cantidad}
						onChange={(e) => setCantidad(Number(e.target.value))}
					/>
				</div>
				<div className="w-full">
					<label className="text-sm text-violet-800">Medida</label>
					<select
						value={medida}
						onChange={(e) => setMedida(e.target.value)}
						className="w-full px-3 py-[10px] rounded-lg text-violet-950"
					>
						<option value="gr">gr</option>
						<option value="mg">mg</option>
						<option value="kg">kg</option>
						<option value="ml">ml</option>
						<option value="pz">Pieza(s)</option>
						<option value="spoon">Cucharada(s)</option>
						<option value="cup">Taza(s)</option>
					</select>
				</div>
				<Button
					color={"bg-violet-600 hover:bg-violet-700 text-white"}
					size={"small"}
				>
					<span className="flex items-center gap-2">
						<span>+</span> Agregar
					</span>
				</Button>
			</form>
		</div>
	);
}

function IngredientesContainer({ seleccion, onRemoveSelected }) {
	return (
		<div>
			{seleccion.length ? (
				<>
					<h2 className="mb-2 text-xl font-bold text-violet-950">
						Ingredientes
					</h2>
					<div className="flex flex-col gap-1">
						{seleccion.map((item, index) => (
							<IngredienteReceta
								item={item}
								key={index}
								onRemoveSelected={onRemoveSelected}
							/>
						))}
					</div>
				</>
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
	);
}

function IngredienteReceta({ item, onRemoveSelected }) {
	function handleRemove(e) {
		e.preventDefault();
		onRemoveSelected(item.id);
	}

	return (
		<>
			{item && (
				<div className="flex items-center justify-between gap-5 p-2 rounded-md bg-violet-50">
					<div>
						<h3 className="text-lg text-violet-900">
							{item?.quantity}
							{item?.unit}
							<span className="text-lg font-normal text-violet-700">
								{" "}
								{item?.name}
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

function AgregaIngredientes({ ingredientes, onSetIngredientes }) {
	function handleSetIngredientes(ingrediente) {
		// console.log(ingrediente);
		onSetIngredientes((ingredientes) => [...ingredientes, ingrediente]);
	}

	return (
		<div className="w-full p-4 mt-6 bg-pink-300 rounded-md text-slate-950">
			<div className="p-4 rounded-md bg-pink-50">
				<h2 className="mb-4 text-3xl font-bold text-center">
					🥚 Costos por ingrediente 🥚
				</h2>
				<ListaIngredientesCostos ingredientes={ingredientes} />
			</div>
			<FormaIngredientes onSetIngredientes={handleSetIngredientes} />
		</div>
	);
}

function ListaIngredientesCostos({ ingredientes }) {
	return (
		<table className="w-full border border-collapse border-pink-200 shadow-sm table-auto">
			<thead className="bg-pink-200">
				<tr>
					<th className="p-3 border border-pink-200">Nombre</th>
					<th className="p-3 border border-pink-200">Costo</th>
					<th className="p-3 border border-pink-200 w-44">⚙</th>
				</tr>
			</thead>
			<tbody>
				{ingredientes.map((ingrediente) => (
					<IngredienteCosto
						ingrediente={ingrediente}
						key={ingrediente.id}
					/>
				))}
			</tbody>
		</table>
	);
}

function IngredienteCosto({ ingrediente }) {
	return (
		<tr className="odd:bg-pink-100">
			<td className="p-3">{ingrediente.name}</td>
			<td className="p-3">
				{ingrediente.quantity} {ingrediente.unit} / ${ingrediente.cost}{" "}
				mxn
			</td>

			<td className="p-3">
				<div className="flex justify-center gap-4">
					<button title="Editar">✏️</button>
					<button title="Borrar">🗑</button>
				</div>
			</td>
		</tr>
	);
}

function FormaIngredientes({ onSetIngredientes }) {
	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [unit, setUnit] = useState("gr");
	const [cost, setCost] = useState(0);

	function handleNewIngredient(e) {
		e.preventDefault();

		if (!name || quantity === 0 || !unit || cost === 0) {
			alert(
				"Asegurate que todos los campos del ingrediente están completos"
			);
			return;
		}

		const id = crypto.randomUUID();

		const newIngredient = {
			id: id,
			name: name,
			quantity: quantity,
			unit: unit,
			cost: cost,
		};

		onSetIngredientes(newIngredient);

		setName("");
		setQuantity(0);
		setUnit("gr");
		setCost(0);
	}
	return (
		<div className="p-4 mt-4 bg-pink-100 rounded-md">
			<form
				className="flex items-end w-full gap-4 justify-evenly"
				onSubmit={handleNewIngredient}
			>
				<div className="w-full">
					<label className="text-sm text-pink-950">Ingrediente</label>
					<input
						type="text"
						placeholder="Nombre del ingrediente"
						className="w-full px-3 py-2 text-base rounded-lg"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="w-full">
					<label className="text-sm text-pink-950">Cantidad</label>
					<input
						type="number"
						placeholder="0"
						className="w-full px-3 py-2 text-base rounded-lg"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>
				<div className="w-full">
					<label className="text-sm text-pink-950">Medida</label>
					<select
						className="w-full px-3 py-[10px] text-base rounded-lg"
						value={unit}
						onChange={(e) => setUnit(e.target.value)}
					>
						<option value="gr">gr</option>
						<option value="mg">mg</option>
						<option value="kg">kg</option>
						<option value="ml">ml</option>
						<option value="lt">lt</option>
					</select>
				</div>
				<div className="w-full">
					<label className="text-sm text-pink-950">Costo</label>
					<input
						type="number"
						placeholder="0"
						className="w-full px-3 py-2 text-base rounded-lg"
						value={cost}
						onChange={(e) => setCost(e.target.value)}
					/>
				</div>
				<Button
					color={"bg-rose-500 hover:bg-rose-600 text-white"}
					size={"small"}
				>
					<span className="flex items-center gap-2">
						<span>+</span> Agregar
					</span>
				</Button>
			</form>
		</div>
	);
}
