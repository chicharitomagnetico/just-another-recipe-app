import { CostosTable } from "./CostosTable";

export function TablaCostosCalculados({ ingredientesCalculados, costos }) {
	return (
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
					{ingredientesCalculados.map((ingrediente, index) => (
						<CostosTable key={index} ingrediente={ingrediente} />
					))}
				</tbody>
				{costos !== 0 && (
					<tfoot className="bg-violet-100">
						<tr>
							<td className="p-1 font-bold border border-violet-100">
								Total
							</td>
							<td className="p-1 font-bold border border-violet-100">
								${Math.round(costos * 100) / 100}
							</td>
						</tr>
					</tfoot>
				)}
			</table>
		</>
	);
}
