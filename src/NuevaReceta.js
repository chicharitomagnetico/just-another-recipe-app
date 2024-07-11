import { useState } from "react";
import { Button } from "./Button";

export function NuevaReceta({ setAgregarReceta, onNuevaReceta }) {
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

			<div className="p-4 mt-4 rounded-md bg-cyan-200">
				<h3 className="mb-2 font-sans text-xl font-bold text-cyan-950">
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
						className="w-full px-3 py-2 rounded-lg text-cyan-950"
					/>
					<textarea
						placeholder="Descripción"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full px-3 py-2 rounded-lg text-cyan-950"
					/>
					<input
						tupe="text"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						className="w-full px-3 py-2 rounded-lg text-cyan-950"
					/>
					<Button
						color={"bg-cyan-700 hover:bg-cyan-800 text-white"}
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
