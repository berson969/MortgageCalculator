import React, {useEffect, useState} from 'react';
import {Forms} from "./Forms.tsx";
import {Table} from "./Table.tsx";
import {DataProps, FormData} from "./DataProps.ts";
import Constants from "./Constants.tsx";
import {getAnnuityPayment, interestNew} from "./startCalculate.ts";
import Legend from "./Legend.tsx";

const MortgageCalculator : React.FC = () => {
	const [tableData, setTableData] = useState<DataProps[]>([]);
	const [annuityPayment, setAnnuityPayment] = useState<number>(0);
	const [targetMonth, setTargetMonth] = useState<number| null>(null);
	const [targetRemainingBalance, setTargetRemainingBalance] = useState<number>(0);
	const [paymentWithoutChange, setPaymentWithoutChange] = useState<number>(0);

	useEffect(() => {
		document.title = "Mortgage Calculator";
	}, []);

	useEffect(() => {
		console.log("Updating Constants with new values:", targetMonth, targetRemainingBalance);
	}, [targetMonth, targetRemainingBalance]);

	const calculateData = (formData: FormData) => {
		const {
			principal,
			annualInterestRate,
			months,
			annuityPayment,
			secondPrincipal,
			secondMonths,
			userPayment
		} = formData;

		const monthInterestRate = annualInterestRate / 12 / 100;
		const newData: DataProps[] = [];
		let balance = principal;
		let secondBalance = secondPrincipal;
		let totalInterestPaid = 0;
		let isMade = false;
		setTargetMonth(null);

		const monthlyCorrect = secondPrincipal / secondMonths;

		for (let i = 0; i < months; i++) {
			const currentInterestPaid = balance * monthInterestRate;

			const newBalance = balance - (userPayment - currentInterestPaid);
			balance = newBalance >= 0 ? newBalance : 0;

			totalInterestPaid += currentInterestPaid;

			secondBalance -= monthlyCorrect;
			const correctTotalInterestPaid = totalInterestPaid - monthlyCorrect;
			const secondRemainingBalance = (secondBalance >= 0) ? secondBalance : 0;

			const totalTotalInterestPaid = totalInterestPaid - (secondPrincipal - secondRemainingBalance);

			const newTerm = secondMonths - (i + 1);
			let newInterestAmount = 0;
			let newPayment = 0;
			let totalPayAmount = 0;

			if (newTerm > 0 && balance > 0) {
				newInterestAmount = interestNew(balance, monthInterestRate, newTerm );
				newPayment = getAnnuityPayment(balance, annualInterestRate, newTerm);
				totalPayAmount = userPayment * (i + 1) + newPayment * newTerm;

				if (!isMade && newInterestAmount - secondRemainingBalance < 0) {

					setTargetMonth(i);
					setTargetRemainingBalance(balance + (userPayment - currentInterestPaid));
					isMade = true;
				}
			}
			newData.push({
				month: i + 1,
				userPayment: userPayment.toFixed(2),
				remainingBalance: balance.toFixed(2),
				currentInterestPaid: currentInterestPaid.toFixed(2),
				totalInterestPaid: totalInterestPaid.toFixed(2),
				secondRemainingBalance: secondRemainingBalance.toFixed(2),
				monthlyCorrect: (secondBalance >= 0) ? monthlyCorrect.toFixed(2) : '0.00',
				correctTotalInterestPaid: correctTotalInterestPaid.toFixed(2),
				totalTotalInterestPaid: totalTotalInterestPaid.toFixed(2),
				newInterestAmount: (newInterestAmount > 0) ? newInterestAmount.toFixed(2): "0.00",
				differenceInterest: (newInterestAmount > 0) ? (secondRemainingBalance -  newInterestAmount).toFixed(2) : "0.00",
				newPayment: newPayment.toFixed(2),
				totalPayAmount: totalPayAmount.toFixed(2),
			})
			if (balance <= 0) {break}  //
		}
		setPaymentWithoutChange(
			userPayment * (newData.length - 1)
			+ parseFloat(newData[newData.length - 2].remainingBalance)
			+ parseFloat(newData[newData.length - 1].secondRemainingBalance)
			+ parseFloat(newData[newData.length - 1].currentInterestPaid)
		);

		setTableData([...newData]);
		setAnnuityPayment(annuityPayment);

	}
	return (
		<div className="container mx-auto">
			<h1 className="text-4xl text-center font-yeseva p-4 font-bold">Calculator DPAL</h1>
			<Forms
				onCalc={calculateData}
			/>
			<Constants
				annuityPayment={annuityPayment}
				targetMonth={targetMonth}
				targetRemainingBalance={targetRemainingBalance}
				paymentWithoutChange={paymentWithoutChange}
			/>
			<Table
				tableData={tableData}
				paymentWithoutChange={paymentWithoutChange}
			/>
			<Legend />
		</div>
	);
};

export default MortgageCalculator;
