// Write your code here
import './index.css'

const TransactionItem = props => {
  const {expenseDetails, deleteTransaction} = props
  const {title, amount, type, id} = expenseDetails
  const onClickDeleteButton = () => {
    deleteTransaction(id, amount, type)
  }
  return (
    <li className="transaction-item-row">
      <p className="title">{title}</p>
      <p className="amount">Rs {amount}</p>
      <p className="type">{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeleteButton}
        testid="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
