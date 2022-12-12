// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {details} = props
  const {incomeAmount, expenseAmount, balanceAmount} = details
  console.log(incomeAmount)
  return (
    <ul>
      <li className="details-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="amount-details-card-img"
        />
        <div>
          <p className="amount-card-heading">Your Balance</p>
          <p className="amount-card-amount" testid="balanceAmount">
            Rs.{balanceAmount}
          </p>
        </div>
      </li>
      <li className="details-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="amount-details-card-img"
        />
        <div>
          <p className="amount-card-heading">Your Income</p>
          <p className="amount-card-amount" testid="incomeAmount">
            Rs.{incomeAmount}
          </p>
        </div>
      </li>
      <li className="details-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="amount-details-card-img"
        />
        <div>
          <p className="amount-card-heading">Your Expenses</p>
          <p className="amount-card-amount" testid="expensesAmount">
            Rs.{expenseAmount}
          </p>
        </div>
      </li>
    </ul>
  )
}

export default MoneyDetails
