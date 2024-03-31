import React from 'react';

interface ConstantsProps {
	annuityPayment: number;
	targetMonth: number | null;
	targetRemainingBalance: number;
	paymentWithoutChange: number;
}
const Constants: React.FC<ConstantsProps> = ({ annuityPayment, targetMonth, targetRemainingBalance, paymentWithoutChange }) => {

	return (
		<div className="flex m-5 justify-between">
			<span className="font-rubik justify-center mr-16">
				{`Annuity Payment first loan ${(annuityPayment > 0) ? annuityPayment.toFixed(2) : ""}`}
			</span>
			<span className="font-rubik justify-center mr-16">
				{`Number of target month ${targetMonth ? targetMonth : "not provided"}`}
			</span>
			{targetMonth && (
				<span className="font-rubik justify-center mr-16">
					{`Remaining Balance in target ${targetRemainingBalance.toFixed(2)}`}
				</span>
			)}
			<span className="font-rubik justify-center mr-16">
				{`Total payment without recalculate  ${paymentWithoutChange}`}
			</span>
		</div>
	);
};

export default Constants;
