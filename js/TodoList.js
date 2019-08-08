class TodoList {
    constructor() {
        this.name = "Unnknown";
        this.owner = "Unknown";
        this.items = new Array();
    }   
    
    setName(initName) {
        this.name = initName;
    }

    getName() {
        return this.name;
    }

    setOwner(initOwner) {
        this.owner = initOwner;
    }

    getOwner() {
        return this.owner;
    }

    addItem(itemToAdd) {
        this.items.push(itemToAdd);
    }

    removeItem(itemToRemove) {
        let indexOfItem = this.items.indexOf(itemToRemove);
        this.items.splice(indexOfItem, 1);
    }

    getIndexOfItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            let testItem = this.items[i];
            if (testItem === item) {
                return i;
            }
        }
        return -1;
    }

    getItemAtIndex(index) {
        return this.items[index];
    }
}