export interface DataProps {
	month: number;
	userPayment: string;
	remainingBalance: string;
	currentInterestPaid: string;
	totalInterestPaid: string;
	secondRemainingBalance: string;
	monthlyCorrect: string;
	correctTotalInterestPaid: string;
	totalTotalInterestPaid: string;
	newInterestAmount: string;
	differenceInterest: string;
	newPayment: string;
	totalPayAmount: string;
	differencePayments: string;
}

export interface FormData {
	principal: number;
	annualInterestRate: number;
	months: number;
	annuityPayment: number;
	secondPrincipal: number;
	secondMonths: number;
	userPayment: number;
}

export interface FormsProps {
	onCalc: (formData: FormData) => void;
}
