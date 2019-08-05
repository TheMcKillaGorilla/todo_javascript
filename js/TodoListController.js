'use strict'

class TodoListController
{
    constructor(initModel) {
        this.model = initModel;
    }

    processHomeRequest() {
        this.model.goHome();
    }

    processNewListRequest() {
        // CHANGE THE SCREEN
        this.model.goList();

        // MAKE A BRAND NEW LIST
        this.model.loadNewList();
    }

    processEditListRequest(listName) {
        // CHANGE THE SCREEN
        this.model.goList();

        // LOAD THE SELECTED LIST
        this.model.loadList(listName);
    }

    processRemoveListRequest(listItemId) {
        // GET THE LIST ITEM

        // REMOVE THE LIST ITEM FROM THE LIST

        // UPDATE THE VIEW
    }

    processNewItemRequest() {
        // THIS COULD ONLY HAVE OCCURED FROM TODO LIST SO HIDE IT
        // AND SHOW LIST ITEM
        this.showElementWithId("todo_list", false);
        this.showElementWithId("todo_list_item", true);
    }

    processSubmitItemChanges() {
        // IS THIS A NEW LIST ITEM?
        if (this.editListItemId == null) {

        }
        // OR IS THIS JUST ONE BEING EDITED
        else {
            
        }
        this.showElementWithId("todo_list_item", false);
        this.showElementWithId("todo_list", true);
    }

    processCancelItemChanges() {
        this.showElementWithId("todo_list_item", false);
        this.showElementWithId("todo_list", true);
    }

    displayListItems() {
        let listItemsList = document.getElementById("list_items_list");
    }
}