import React from 'react';
import "./table.css";
import {DataProps} from "./DataProps.ts";

const getColorClass = (data: string) => {
	return parseFloat(data) < 0 ? 'text-red-500' : 'text-green-500';
}

const calcDifferencePayment = (amount: string, payment: number) => {
	const diff = (parseFloat(amount) === 0) ? 0 :  payment - parseFloat(amount);
	return diff.toFixed(2)
}

interface TableProps {
	tableData: DataProps[];
	paymentWithoutChange: number;
}

export const Table: React.FC<TableProps>  = ({ tableData, paymentWithoutChange }) => {

	return (
		<div className="scroll-table">
			<table>
				<thead>
					<tr>
						<th  className="border border-gray-300 px-4 py-2">Month</th>
						<th  className="border border-gray-300 px-4 py-2">Payment</th>
						<th  className="border border-gray-300 px-4 py-2">Remaining Balance</th>
						<th  className="border border-gray-300 px-4 py-2">Interest Paid</th>
						<th  className="border border-gray-300 px-4 py-2">Total Interest Paid</th>
						<th  className="border border-gray-300 px-4 py-2">Write Off</th>
						<th  className="border border-gray-300 px-4 py-2">DPAL</th>
						<th  className="border border-gray-300 px-4 py-2">Full Total Interest</th>
						<th  className="border border-gray-300 px-4 py-2">New payment</th>
						<th  className="border border-gray-300 px-4 py-2">New Interest for Remaining Term</th>
						<th  className="border border-gray-300 px-4 py-2">Total will be Paid</th>
						<th  className="border border-gray-300 px-4 py-2">Difference between total Payments</th>
						<th  className="border border-gray-300 px-4 py-2">Difference Amount</th>
					</tr>
				</thead>
			</table>
			<div className="scroll-table-body">
				<table>
					<tbody>
					{tableData.map((data) => (
						<tr key={data.month}>
							<td  className="border border-gray-300 px-4 py-2 justify-center">{data.month}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end">{data.userPayment}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end">{data.remainingBalance}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end">{data.currentInterestPaid}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end">{data.totalInterestPaid}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end ">{data.monthlyCorrect}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end">{data.secondRemainingBalance}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end">{data.totalTotalInterestPaid}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end  text-sky-500">{data.newPayment}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end ">{data.newInterestAmount}</td>
							<td  className="border border-gray-300 px-4 py-2 text-end ">{data.totalPayAmount}</td>
							<td
								className={`border border-gray-300 px-4 py-2 text-end
									${getColorClass(calcDifferencePayment(data.totalPayAmount, paymentWithoutChange))}`}>
								{calcDifferencePayment(data.totalPayAmount, paymentWithoutChange)}
							</td>
							<td
								className={`border border-gray-300 px-4 py-2 text-end ${getColorClass(data.differenceInterest)}`}>
								{data.differenceInterest}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
