import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    incomeAmount: 0,
    expenseAmount: 0,
    title: '',
    amount: '',
    type: 'Income',
    balanceAmount: 0,
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amount: event.target.value})
  }

  onChangeTypeInput = event => {
    let type
    if (event.target.value === transactionTypeOptions[0].optionId) {
      type = transactionTypeOptions[0].displayText
    } else {
      type = transactionTypeOptions[1].displayText
    }
    this.setState({type})
  }

  onSubmitAddTransaction = event => {
    event.preventDefault()
    const {title, type, amount, incomeAmount, expenseAmount} = this.state
    let newIncomeAmount = 0
    let newExpenseAmount = 0
    if (type === 'Income') {
      newIncomeAmount = incomeAmount + parseInt(amount)
      newExpenseAmount = parseInt(expenseAmount)
    } else {
      newExpenseAmount = expenseAmount + parseInt(amount)
      newIncomeAmount = parseInt(incomeAmount)
    }
    const newBalanceAmount = newIncomeAmount - newExpenseAmount
    const newTransaction = {
      id: uuidv4(),
      title,
      type,
      amount,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      type: 'Income',
      amount: '',
      incomeAmount: newIncomeAmount,
      expenseAmount: newExpenseAmount,
      balanceAmount: newBalanceAmount,
    }))
  }

  deleteTransaction = (id, amount, type) => {
    const {transactionsList, incomeAmount, expenseAmount} = this.state
    let newIncomeAmount = 0
    let newExpenseAmount = 0
    if (type === 'Income') {
      newIncomeAmount = incomeAmount - parseInt(amount)
      newExpenseAmount = parseInt(expenseAmount)
    } else {
      newExpenseAmount = expenseAmount - parseInt(amount)
      newIncomeAmount = parseInt(incomeAmount)
    }
    const newBalanceAmount = newIncomeAmount - newExpenseAmount
    const updatedTransactionsList = transactionsList.filter(
      transaction => transaction.id !== id,
    )
    this.setState({
      transactionsList: updatedTransactionsList,
      expenseAmount: newExpenseAmount,
      incomeAmount: newIncomeAmount,
      balanceAmount: newBalanceAmount,
    })
  }

  render() {
    const {
      transactionsList,
      incomeAmount,
      expenseAmount,
      balanceAmount,
      title,
      amount,
    } = this.state
    // console.log(incomeAmount)
    const Details = {
      incomeAmount,
      expenseAmount,
      balanceAmount,
    }
    // console.log(Details)
    return (
      <div className="money-manager">
        <section className="top-section-card">
          <div>
            <h1 className="wishing-user">Hi Richard</h1>
            <p className="welcome-back-text">
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
        </section>
        <section className="amount-details-card">
          <MoneyDetails details={Details} />
        </section>
        <section className="transactions-section">
          <section className="add-transaction-section">
            <h1 className="add-transaction-heading">Add Transaction</h1>
            <form>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                type="text"
                placeholder="TITLE"
                onChange={this.onChangeTitleInput}
                value={title}
                id="title"
              />
              <br />
              <label htmlFor="amount">AMOUNT</label>
              <br />
              <input
                value={amount}
                type="text"
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onChangeAmountInput}
              />
              <br />
              <label htmlFor="type">TYPE</label>
              <br />
              <select id="type" onChange={this.onChangeTypeInput}>
                {transactionTypeOptions.map(option => (
                  <option value={option.optionId} key={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" onClick={this.onSubmitAddTransaction}>
                Add
              </button>
            </form>
          </section>
          <section className="history-section">
            <h1 className="history-section-heading">History</h1>
            <div className="history-table">
              <div className="history-table-header">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </div>
              <hr />
              <ul className="transaction-column">
                {transactionsList.map(expense => (
                  <TransactionItem
                    expenseDetails={expense}
                    key={expense.id}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </section>
        </section>
      </div>
    )
  }
}
export default MoneyManager
