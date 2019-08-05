class TodoListModel {
    constructor(initView) {
        this.view = initView;

        // WE DON'T HAVE A DATABASE SO WE NEED TO KEEP
        // ALL OF THE LISTS WE MAKE HERE
        this.todoLists = new Array();
    }

    addList(listToAdd) {
        this.todoLists.push(listToAdd);
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
        this.addNewList(listToMove);

        this.view.loadListLinks();
    }

    goHome() {
        // THIS COULD HAPPEN ANYWHERE SO HIDE ALL THE OTHERS
        this.view.showElementWithId("top_toolbar", false);
        this.view.showElementWithId("todo_list", false);
        this.view.showElementWithId("todo_list_item", false);

        // AND GO HOME
        this.view.showElementWithId("todo_home", true);        
    }

    goList() {
        this.editListItemId = null;

        // THIS MIGHT HAVE OCCURED FROM HOME SO HIDE HOME
        this.view.showElementWithId("todo_home", false);

        // SHOW THE TOOLBAR AND LIST EDIT
        this.view.showElementWithId("top_toolbar", true);
        this.view.showElementWithId("todo_list", true);
    }

    goEditList() {

    }

    loadNewList() {
        this.newList = new TodoList();
        this.view.loadListData(this.newList);
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
            this.view.loadListData(listToLoad);
        }
    }
}