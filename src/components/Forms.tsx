import React, {useEffect, useState} from 'react';
import {getAnnuityPayment} from "./startCalculate.ts";
import {FormsProps, FormData } from "./DataProps.ts";
import {getFormData, saveFormData} from "./LocalStorage.ts";

export const Forms: React.FC<FormsProps> = ({ onCalc }) => {
	const [principal, setPrincipal] = useState<number>(0);
	const [annualInterestRate, setAnnualInterestRate] = useState<number>(0);
	const [months, setMonths] = useState<number>(0);
	const [secondPrincipal, setSecondPrincipal] = useState<number>(0);
	const [secondMonths, setSecondMonths] = useState<number>(120);
	const [userPayment, setUserPayment] = useState<number>(0);

	useEffect(() => {
		const {
			principal,
			annualInterestRate,
			months,
			secondPrincipal,
			secondMonths,
			userPayment} = getFormData();

		console.log("secondMonths", secondMonths)
		console.log('principal', principal)
		setPrincipal(principal);
		setAnnualInterestRate(annualInterestRate);
		setMonths(months);
		setSecondPrincipal(secondPrincipal);
		setSecondMonths(secondMonths);
		setUserPayment(userPayment);

	}, []);

	useEffect(() => {
		if (!secondMonths)  {
			setSecondMonths(120);
		}
	}, [secondMonths]);

	const handleCalculate = () => {

		const annuityPayment = getAnnuityPayment(principal, annualInterestRate, months);
		const formData: FormData = { principal, annualInterestRate, months, annuityPayment, secondPrincipal, secondMonths, userPayment}

		onCalc(formData)

		saveFormData({
			principal,
			annualInterestRate,
			months,
			annuityPayment,
			secondPrincipal,
			secondMonths,
			userPayment,
		})
	}

	return (
		<div className="flex flex-col justify-center my-12 mx-64">
			<div className="flex justify-between font-yeseva">
				<div className="flex flex-col gap-2">
					<div className="flex  w-96 justify-between">
						<label htmlFor="loan-amount" className="mr-5 whitespace-nowrap text-xl">Loan Amount</label>
						<input
							id="loan-amount"
							type="number"
							min="0"
							step="1000"
							placeholder="Loan Amount"
							value={principal === 0 ? '' : principal}
							onChange={(e) => setPrincipal(parseFloat(e.target.value))}
							className="text-right border-2 rounded-s border-sky-500 h-8 custom-placeholder lowercase"
							required
						/>
					</div>
					<div className="flex  w-96 justify-between">
						<label htmlFor="interest-rate" className="mr-5 whitespace-nowrap text-xl">Interest Rate</label>
						<input
							id="interest-rate"
							type="number"
							min="0"
							step="0.1"
							placeholder="Interest Rate"
							value={annualInterestRate === 0 ? '' : annualInterestRate}
							onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value))}
							className="text-right border-2 rounded-s border-sky-500  h-8 custom-placeholder lowercase"
							required
						/>
					</div>
					<div className="flex  w-96 justify-between">
						<label htmlFor="months-left" className="mr-5 whitespace-nowrap text-xl">Term in months</label>
						<input
							id="months-left"
							type="number"
							min="0"
							step="10"
							placeholder="Months left"
							value={months <= 0 ? '' : months}
							onChange={(e) => setMonths(parseFloat(e.target.value))}
							className="text-right border-2 rounded-s border-sky-500 h-8 custom-placeholder lowercase"
							required
						/>
					</div>
					<div className="flex  w-96 justify-between">
						<label htmlFor="user-payment" className="mr-5 whitespace-nowrap text-xl">Payment</label>
						<input
							id="user-payment"
							type="number"
							min="0"
							step="100"
							placeholder="User payment"
							value={userPayment <= 0 ? '' : userPayment}
							onChange={(e) => setUserPayment(parseFloat(e.target.value))}
							className="text-right border-2 rounded-s border-sky-500 h-8 custom-placeholder lowercase"
							required
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex  w-96 justify-between">
						<label htmlFor="second-loan" className="mr-5 px-2 whitespace-nowrap text-xl">DPAL</label>
						<input
							id="second-loan"
							type="number"
							min="0"
							step="100"
							placeholder="Second Loan Amount"
							value={secondPrincipal <= 0 ? '' : secondPrincipal}
							onChange={(e) => setSecondPrincipal(parseFloat(e.target.value))}
							className="text-right border-2 rounded-s border-sky-500 h-8 custom-placeholder lowercase"
							required
						/>
					</div>
					<div className="flex w-96 justify-between">
						<label htmlFor="second-months-left" className="mr-5 px-2 whitespace-nowrap text-xl">DPAL in months</label>
						<input
							id="second-months-left"
							type="number"
							min="0"
							step="10"
							placeholder="Second Months left"
							value={secondMonths != null ? secondMonths : ''}
							onChange={e => setSecondMonths(parseFloat(e.target.value))}

							className="text-right border-2 rounded-s border-sky-500  h-8 custom-placeholder lowercase"

						/>
					</div>
				</div>
			</div>
			<button
				onClick={handleCalculate}
				className="bg-blue-600 w-full my-3 mx-auto p-1 text-center text-white rounded-md min-h-6">Calculate
			</button>
		</div>
	);
};

