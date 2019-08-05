class jTPS_Transaction {
    /**
     * This method is called by jTPS when a transaction is executed.
     */
    doTransaction();
    
    /**
     * This method is called by jTPS when a transaction is undone.
     */
    undoTransaction();
}

class jsTPS {
    constructor() {
        this.transactions = new Array();
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }

    isPerformingDo() {
        return this.performingDo;
    }

    isPerformingUndo() {
        return this.performingUndo;
    }

    hasTransactionToRedo() {
        return this.mostRecentTransaction < (this.transactions.size()-1);
    }

    hasTransactionsToUndo() {
        return this.mostRecentTransaction >= 0;
    }

    addTransaction(transaction) {
        // ARE WE BRANCHING?
        if ((this.mostRecentTransaction < 0) 
            || (this.mostRecentTransaction < (this.transactions.length - 1))) {
                for (let i = this.transactions.length - 1; i > this.mostRecentTransaction; i--) {
                    this.transactions.splice(i, 1);
                }
        }

        // ADD THE TRANSACTION
        this.transactions.add(transaction);

        // AND EXECUTE IT
        this.doTransaction();
    }

    doTransaction() {
        if (this.hasTransactionsToUndo()) {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.isPerformingUndo = false;
        }
    }

    clearAllTransactions() {
        // REMOVE ALL THE TRANSACTIONS
        this.transactions.clear();
        
        // MAKE SURE TO RESET THE LOCATION OF THE
        // TOP OF THE TPS STACK TOO
        this.mostRecentTransaction = -1;       
    }

    getSize() {
        return this.transactions.length;
    }

    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }

    getDescription() {        
        let text = "--Number of Transactions: " + transactions.size() + "\n";
        text += "--Current Index on Stack: " + mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (let i = 0; i <= mostRecentTransaction; i++) {
            let jT = transactions.get(i);
            text += "----" + jT.toString() + "\n";
        }
        return text;        
    }
}