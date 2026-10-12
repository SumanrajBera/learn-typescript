class BankAccount {
    // Private values
    protected accountHolder: string
    protected balance: number

    constructor(accountHolder: string, balance: number = 0) {
        this.accountHolder = accountHolder
        this.balance = balance
    }

    get holderName() {
        return this.accountHolder
    }

    get getBalance() {
        return this.balance
    }

    set setBalance(balance: number) {
        this.balance += balance
    }
}

const newAccount = new BankAccount("Sumanraj")
// This is how we set if we have two or more then we can make use of objects
newAccount.setBalance = 500
console.log(newAccount.getBalance)

// Inheritance: Here it is a type of account only
class StocksPortfolio extends BankAccount {
    constructor(accountHolder: string, balance: number = 0) {
        super(accountHolder, balance)
    }
}

// Composition: Here FD is seperate and can refer to the account
type FDinfo = {
    years: number
    amount: number
}

class FD {
    protected fds: FDinfo[] = []
    constructor(account: BankAccount) { }

    set newFd(value: { years: number, amount: number }) {
        this.fds.push(value)
    }

    get allFDs() {
        return this.fds
    }
}