const getAnnuityRate = (monthlyInterestRate: number, months: number) => {
	return monthlyInterestRate * Math.pow((1 + monthlyInterestRate), months) / (Math.pow((1 + monthlyInterestRate), months) - 1);
}
export const getAnnuityPayment = (principal: number, annualInterestRate: number, months: number) => {
	const monthlyInterestRate = annualInterestRate / 12 / 100;
	return principal * getAnnuityRate(monthlyInterestRate, months);
}

export const interestNew = (principal: number, interestRate: number, termMonths: number) => {
	return (getAnnuityRate(interestRate, termMonths) * principal * termMonths) - principal;
}
