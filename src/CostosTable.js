export function CostosTable({ ingrediente }) {
	return (
		<tr>
			<td className="p-1 border border-violet-100">
				{ingrediente?.name}
			</td>
			<td className="p-1 border border-violet-100">
				{" $"}
				{Math.round(ingrediente?.cost * 100) / 100}
			</td>
		</tr>
	);
}
