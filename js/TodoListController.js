'use strict'

class TodoListController
{
    constructor() {

    }

    showElement(elementId, show) {
        let element = document.getElementById(elementId);
        element.hidden = !show;
        
        // @todo DISABLE THE BUTTON AS WELL
    }

    processHomeRequest() {
        // THIS COULD HAPPEN ANYWHERE SO HIDE ALL THE OTHERS
        this.showElement("todo_list", false);
        this.showElement("todo_list_item", false);

        // AND GO HOME
        this.showElement("todo_home", true);
    }

    processNewListRequest() {
        this.editListItemId = null;

        // THIS COULD ONLY HAVE OCCURED FROM HOME SO HIDE HOME
        this.showElement("todo_home", false);

        // AND SHOW EDIT
        this.showElement("todo_list", true);   
    }

    processEditListRequest(listItemId) {
        this.editListItemId = listItemId;

        // GET THE LIST ITEM

        // LOAD ALL THE LIST ITEM DATA INTO THE EDIT CONTROLS
    }

    processRemoveListRequest(listItemId) {
        // GET THE LIST ITEM

        // REMOVE THE LIST ITEM FROM THE LIST

        // UPDATE THE VIEW
    }

    processNewItemRequest() {
        // THIS COULD ONLY HAVE OCCURED FROM TODO LIST SO HIDE IT
        // AND SHOW LIST ITEM
        this.showElement("todo_list", false);
        this.showElement("todo_list_item", true);
    }

    processSubmitItemChanges() {
        // IS THIS A NEW LIST ITEM?
        if (this.editListItemId == null) {

        }
        // OR IS THIS JUST ONE BEING EDITED
        else {
            
        }
        this.showElement("todo_list_item", false);
        this.showElement("todo_list", true);
    }

    processCancelItemChanges() {
        this.showElement("todo_list_item", false);
        this.showElement("todo_list", true);
    }
}