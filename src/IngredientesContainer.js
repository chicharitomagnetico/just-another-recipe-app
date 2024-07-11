import { IngredienteReceta } from "./IngredienteReceta";
import { CostosTable } from "./CostosTable";

export function IngredientesContainer({
	ingredientesAgregados,
	onRemoveSelected,
	selectedRecipe,
	costos,
	ingredientesCalculados,
}) {
	return (
		<>
			{selectedRecipe && (
				<div>
					{ingredientesAgregados.length ? (
						<>
							<h2 className="mb-2 text-xl font-bold text-violet-950">
								Ingredientes {selectedRecipe?.name}
							</h2>
							<div className="flex flex-col gap-1">
								{ingredientesAgregados.map(
									(ingredienteNuevo, index) => (
										<IngredienteReceta
											ingredienteNuevo={ingredienteNuevo}
											key={index}
											onRemoveSelected={onRemoveSelected}
										/>
									)
								)}
							</div>
							{ingredientesCalculados.length > 0 && (
								<div className="mt-5">
									<h2 className="mb-2 text-xl font-bold text-violet-950">
										Costos {selectedRecipe?.name}
									</h2>
									<div>
										<>
											<table className="w-full border border-collapse shadow-sm table-auto border-violet-100 text-violet-950">
												<thead className="bg-violet-100">
													<tr>
														<th className="p-1 text-left border border-violet-100">
															Ingrediente
														</th>
														<th className="p-1 text-left border border-violet-100">
															Costo
														</th>
													</tr>
												</thead>
												<tbody>
													{ingredientesCalculados.map(
														(
															ingrediente,
															index
														) => (
															<CostosTable
																key={index}
																ingrediente={
																	ingrediente
																}
															/>
														)
													)}
												</tbody>
												{costos !== 0 && (
													<tfoot className="bg-violet-100">
														<tr>
															<td className="p-1 font-bold border border-violet-100">
																Total
															</td>
															<td className="p-1 font-bold border border-violet-100">
																$
																{Math.round(
																	costos * 100
																) / 100}
															</td>
														</tr>
													</tfoot>
												)}
											</table>
										</>
									</div>
								</div>
							)}
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
			)}
		</>
	);
}
