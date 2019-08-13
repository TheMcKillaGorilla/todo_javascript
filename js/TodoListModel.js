class TodoListModel {
    constructor(initView) {
        this.view = initView;

        // WE DON'T HAVE A DATABASE SO WE NEED TO KEEP
        // ALL OF THE LISTS WE MAKE HERE
        this.todoLists = new Array();

        this.listToEdit = null;
    }

    setListToEdit(initListToEdit) {
        this.listToEdit = initListToEdit;
        if (this.listToEdit) {
            this.moveListToTop(this.listToEdit);            
            this.view.loadListData(this.listToEdit);
        }
    }

    isEditingItem() {
        return this.editItem != null;
    }

    appendList(listToAppend) {
        this.todoLists.push(listToAppend);
        this.view.appendListLink(listToAppend);
    }

    prependList(listToPrepend) {
        this.todoLists.unshift(listToPrepend);
        this.view.loadListLinks(this.todoLists);
    }

    removeList(listToRemove) {
        // REMOVE IT IF IT EXISTS
        let indexOfList = this.todoLists.indexOf(listToRemove);
        if (indexOfList >= 0)
            this.todoLists.splice(indexOfList, 1);
        this.view.loadListLinks(this.todoLists);
    }

    moveListToTop(listToMove) {
        // REMOVE THE LIST IF IT EXISTS
        this.removeList(listToMove);

        // AND THEN ADD IT TO THE TOP OF THE STACK
        this.prependList(listToMove);
    }

    goHome() {
        // THIS COULD HAPPEN ANYWHERE SO HIDE ALL THE OTHERS
        this.view.showElementWithId(TodoGUIId.TODO_LIST, false);
        this.view.showElementWithId(TodoGUIId.TODO_ITEM, false);

        // AND GO HOME
        this.view.showElementWithId(TodoGUIId.TODO_HOME, true);        
    }

    goList() {
        // THIS MIGHT HAVE OCCURED FROM HOME SO HIDE HOME
        this.view.showElementWithId(TodoGUIId.TODO_HOME, false);

        // OR FROM AN ITEM SO HIDE THE ITEM EDIT SCREEN
        this.view.showElementWithId(TodoGUIId.TODO_ITEM, false);

        // SHOW THE TOOLBAR AND LIST EDIT
        this.view.showElementWithId(TodoGUIId.TODO_LIST, true);
    }

    goItem() {
        // THIS COULD HAPPEN ANYWHERE SO HIDE ALL THE OTHERS
        this.view.showElementWithId(TodoGUIId.TODO_LIST, false);
        this.view.showElementWithId(TodoGUIId.TODO_HOME, false);

        // AND GO HOME
        this.view.showElementWithId(TodoGUIId.TODO_ITEM, true);  
    }

    loadNewItem() {
        this.newItem = new TodoListItem();
        this.view.loadItemData(this.newItem);
    }

    loadItem(itemIndex) {
        // FIRST FIND THE ITEM TO EDIT
        this.editItem = this.listToEdit.getItemAtIndex(itemIndex);
        if (this.editItem != null) {
            this.view.loadItemData(this.editItem);
        }
    }

    moveUp(itemIndex) {
        itemIndex = new Number(itemIndex);
        if ((0 < itemIndex) && (itemIndex < this.listToEdit.items.length)) {
            let temp = this.listToEdit.items[itemIndex];
            this.listToEdit.items[itemIndex] = this.listToEdit.items[itemIndex-1];
            this.listToEdit.items[itemIndex-1] = temp;
            this.view.loadItems(this.listToEdit);
        }
    }

    moveDown(itemIndex) {
        itemIndex = new Number(itemIndex);
        if ((this.listToEdit.items.length > 1) 
            && (itemIndex < this.listToEdit.items.length-1)) {
            let temp = this.listToEdit.items[itemIndex];
            this.listToEdit.items[itemIndex] = this.listToEdit.items[itemIndex+1];
            this.listToEdit.items[itemIndex+1] = temp;
            this.view.loadItems(this.listToEdit);
        }
    }

    deleteItem(itemIndex) {
        itemIndex = new Number(itemIndex);
        this.listToEdit.items.splice(itemIndex, 1);
        this.view.loadItems(this.listToEdit);
    }

    updateItem(item, description, assignedTo, dueDate, completed) {
        item.setDescription(description);
        item.setAssignedTo(assignedTo);
        item.setDueDate(dueDate);
        item.setCompleted(completed);
        this.view.loadListData(this.listToEdit);
        this.editItem = null;
        this.newItem = null;
    }

    updateEditedItem(description, assignedTo, dueDate, completed) {
        this.updateItem(this.editItem, description, assignedTo, dueDate, completed);
    }

    updateNewItem(description, assignedTo, dueDate, completed) {
        this.listToEdit.addItem(this.newItem);
        this.updateItem(this.newItem, description, assignedTo, dueDate, completed);
    }

    updateListName(listBeingEdited, newName) {
        // WE'RE GOING TO CHANGE THE NAME TOO BUT ONLY UPDATE
        // THE LIST OF LIST LINKS IF IT'S CHANGED
        if (listBeingEdited.getName() != newName) {
            listBeingEdited.setName(newName);
            this.view.loadListLinks(this.todoLists);
        }
    }

    updateListOwner(listBeingEdited, newOwner) {
        listBeingEdited.setOwner(newOwner);
    }
        
    loadNewList() {
        this.listToEdit = new TodoList();
        this.prependList(this.listToEdit);
        this.view.loadListData(this.listToEdit);
    }

    loadList(listName) {
        // FIRST FIND THE LIST WITH THE GIVEN NAME
        let listToLoad = null;
        for (let i = 0; i < this.todoLists.length; i++) {
            let testList = this.todoLists[i]; 
            if (testList.getName() === listName) {
                listToLoad = testList;
                i = this.todoLists.length;
            }
        }

        if (listToLoad != null) {
            this.setListToEdit(listToLoad);
        }
    }

    sortTasks(sortingCriteria) {
        this.currentItemSortCriteria = sortingCriteria;
        this.listToEdit.items.sort(this.compare);
        this.view.loadItems(this.listToEdit);
    }

    isCurrentItemSortCriteria(testCriteria) {
        return this.currentItemSortCriteria === testCriteria;
    }

    compare(item1, item2) {
        let thisModel = window.todo.model;
        if (thisModel.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
            || thisModel.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)
            || thisModel.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        if (thisModel.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            if (item1.getDescription() < item2.getDescription())
                return -1;
            else if (item1.getDescription() > item2.getDescription())
                return 1;
            else
                return 0;
        }
        else if (thisModel.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            if (item1.getDueDate() < item2.getDueDate())
                return -1;
            else if (item1.getDueDate() > item2.getDueDate())
                return 1;
            else
                return 0;
        }
        else {
            if (item1.isCompleted() < item2.isCompleted())
                return -1;
            else if (item1.isCompleted() > item2.isCompleted())
                return 1;
            else
                return 0;
        }
    }
}