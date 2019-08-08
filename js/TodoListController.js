'use strict'

class TodoListController {
    constructor(initModel) {
        this.model = initModel;
    }

    processHomeRequest() {
        this.model.goHome();
    }

    processNewListRequest() {
        // MAKE A BRAND NEW LIST
        this.model.loadNewList();

        // CHANGE THE SCREEN
        this.model.goList();
    }

    processEditListRequest(listName) {
        // LOAD THE SELECTED LIST
        this.model.loadList(listName);

        // CHANGE THE SCREEN
        this.model.goList();
    }

    processRemoveListRequest(listItemId) {
        // GET THE LIST ITEM

        // REMOVE THE LIST ITEM FROM THE LIST

        // UPDATE THE VIEW
    }

    processNewItemRequest() {
        this.model.loadNewItem();
        this.model.goItem();
    }

    processEditItemRequest(itemIndex) {
        this.model.loadItem(itemIndex);
        this.model.goItem();
    }

    processSubmitItemChangesRequest() {
        let descriptionTextField = document.getElementById("item_description");
        let description = descriptionTextField.value;
        let assignedToTextField = document.getElementById("item_assigned_to");
        let assignedTo = assignedToTextField.value;
        let dueDatePicker = document.getElementById("item_due_date");
        let dueDate = dueDatePicker.value;
        let completedCheckbox = document.getElementById("item_completed");
        let completed = completedCheckbox.checked;
        
        // IS THIS AN EXISTING LIST ITEM?
        if (this.model.isEditingItem()) {
            this.model.updateEditedItem(description, assignedTo, dueDate, completed);
        }
        // OR A NEW ONE
        else {
            this.model.updateNewItem(description, assignedTo, dueDate, completed);
        }

        // CHANGE THE SCREEN
        this.model.goList();
    }

    processCancelItemChangesRequest() {
        this.model.goList();
    }

    processMoveItemUpRequest(event, itemIndex) {
        event.stopPropagation();
        this.model.moveUp(itemIndex);
    }

    processMoveItemDownRequest(event, itemIndex) {
        event.stopPropagation();
        this.model.moveDown(itemIndex);
    }

    processDeleteItemRequest(event, itemIndex) {
        event.stopPropagation();
        this.model.deleteItem(itemIndex);
    }
}