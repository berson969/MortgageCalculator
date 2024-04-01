import React from 'react';
import Markdown from "react-markdown";

const Legend: React.FC = () => {
	const textLegend = `
**LEGEND**
* *AnnP* **Annuity Payment first loan** Аннуитетный платеж по первоначальному кредиту (**K * principal**)
* *TgtM* *Number of Target Month** Номер месяца, когда сумма выплачиваемых процентов при пересчете сравняется с остатком баланса DPAL
* *TgtB* **Remaining Balance in target** Остаток баланса основного кредита на **TgtM**
* *SUM* **Total payment without recalculate** Сумма, которую надо выплатить если продолжать платить платеж из **п2** (**п2 * (*последний месяц п1* - 1) + (*предпоследний месяц п3*) + (*остаток DPAL*) + (*последние проценты п4*)**)

1. *п1* **Month** Текущий месяц
2. *п2* **Payment** Платеж, который клиент выбрал для первоначальной выплаты кредита
3. *п3* **Remaining Balance** Текущий остаток основного кредита
4. *п4* **Interest Paid** Сумма процентов выплаченная в текущем месяце
5. *п5* **Total Interest Paid** Сумма процентов с накопленным итогом
6. *п6* **Write Off** Сумма ежемесячного списания с DPAL
7. *п7* **DPAL** Остаток задолжности DPAL
8. *п8* **Full Total Interest** Общий выплаченный процент скорректированный на DPAL (**п5 - п6**)
9. *п9* **New Payment** Аннуитетный платеж, рассчитанный на срок до конца действия DPAL, на остаток основного долга
10. *п10* **New Interest for Remaining Term** Проценты, которые будут выплачены по новому пересчету до конца срока действия DPAL (**(K * remainingBalance * newTerm) - remainingBalance** )
11. *п11* **Total Bill Be Paid** Сумма которая будет выплачена , если в этот момент пересчитать на новый платеж (**п2 * п1 + п9 * newTerm**)
12. *п12* **Difference between Total Payments** Разница между суммой выплаченной при постоянном платеже и общая сумма при переходе на новый платеж (**п11 < 0 ? 0 : SUM - п11**)
13. *п13* **Difference Amount** Разница между текущим балансом DPAL и суммой процентов, которые должны быть заплачены после пересчета (**п10 > 0 ? п7 - п10 : 0**)
	`;
	return (
		<div className="m-12 border border-gray-300 p-2 font-rubik">
			<Markdown className="text-xs">
				{textLegend}
			</Markdown>
		</div>
	);
};

export default Legend;
