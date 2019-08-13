'use strict'

class TodoListController {
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoGUIEventName.CLICK, this[TodoCallback.PROCESS_NEW_LIST_REQUEST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoGUIEventName.CLICK, this[TodoCallback.PROCESS_HOME_REQUEST]);
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoGUIEventName.CLICK, this[TodoCallback.PROCESS_DELETE_LIST_REQUEST]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoGUIEventName.KEYUP, this[TodoCallback.PROCESS_NAME_CHANGE_REQUEST]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoGUIEventName.KEYUP, this[TodoCallback.PROCESS_OWNER_CHANGE_REQUEST]);

        // THESE FOUR ON THE ITEM SCREEN ALL USE THE SAME EVENT HANDLER
        let controlsToRegister = [TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD, TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD, TodoGUIId.ITEM_DUE_DATE_PICKER, TodoGUIId.ITEM_COMPLETED_CHECKBOX];
        for (let i = 0; i < controlsToRegister.length; i++)
            this.registerEventHandler(controlsToRegister[i], TodoGUIEventName.KEYUP, this[TodoCallback.PROCESS_ITEM_CHANGES_REQUEST]);

        // THE SUBMIT AND CANCEL BUTTONS ON THE ITEM SCREEN
        this.registerEventHandler(TodoGUIId.ITEM_FORM_SUBMIT_BUTTON, TodoGUIEventName.CLICK, this[TodoCallback.PROCESS_SUBMIT_ITEM_CHANGES_REQUEST]);
        this.registerEventHandler(TodoGUIId.ITEM_FORM_CANCEL_BUTTON, TodoGUIEventName.CLICK, this[TodoCallback.PROCESS_CANCEL_ITEM_CHANGES_REQUEST]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(TodoGUIId.MODAL_YES_BUTTON, TodoGUIEventName.CLICK, this[TodoCallback.PROCESS_YES_DELETE_REQUEST]);
        this.registerEventHandler(TodoGUIId.MODAL_NO_BUTTON, TodoGUIEventName.CLICK, this[TodoCallback.PROCESS_NO_DELETE_REQUEST]);
    }

    registerEventHandler(id, eventName, callback) {
        let control = document.getElementById(id);
        control.addEventListener(eventName, callback);
    }

    processItemChangesRequest(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            window.todo.controller.processSubmitItemChangesRequest();
        }
    }

    processNameChangeRequest() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    processOwnerChangeRequest() {
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    processHomeRequest() {
        window.todo.model.goHome();
    }

    processNewListRequest() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    processEditListRequest(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    processDeleteListRequest() {
        // VERIFY VIA A DIALOG BOX
        window.todo.model.view.showDialog();

/*        let response = confirm("Are you sure you wish to delete this list?");
        if (response == true) {
            // DELETE THE LIST
            this.model.removeList(this.model.listToEdit);

            // AND GO BACK TO THE HOME SCREEN
            this.model.goHome();
        }*/
    }

    processYesDeleteRequest() {
        // DELETE THE LIST
        window.todo.model.removeList(window.todo.model.listToEdit);

        // AND GO BACK TO THE HOME SCREEN
        window.todo.model.goHome();

        // AND HIDE THE DIALOG
        window.todo.view.hideDialog();
    }

    processNoDeleteRequest() {
        // JUST HIDE THE DIALOG
        window.todo.view.hideDialog();
    }

    processNewItemRequest() {
        window.todo.model.loadNewItem();
        window.todo.model.goItem();
    }

    processEditItemRequest(itemIndex) {
        window.todo.model.loadItem(itemIndex);
        window.todo.model.goItem();
    }

    processSubmitItemChangesRequest() {
        let descriptionTextField = document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD);
        let description = descriptionTextField.value;
        let assignedToTextField = document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD);
        let assignedTo = assignedToTextField.value;
        let dueDatePicker = document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER);
        let dueDate = dueDatePicker.value;
        let completedCheckbox = document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX);
        let completed = completedCheckbox.checked;
        
        // IS THIS AN EXISTING LIST ITEM?
        if (window.todo.model.isEditingItem()) {
            window.todo.model.updateEditedItem(description, assignedTo, dueDate, completed);
        }
        // OR A NEW ONE
        else {
            window.todo.model.updateNewItem(description, assignedTo, dueDate, completed);
        }

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    processCancelItemChangesRequest() {
        window.todo.model.goList();
    }

    processMoveItemUpRequest(itemIndex) {
        event.stopPropagation();
        window.todo.model.moveUp(itemIndex);
    }

    processMoveItemDownRequest(itemIndex) {
        event.stopPropagation();
        window.todo.model.moveDown(itemIndex);
    }

    processDeleteItemRequest(itemIndex) {
        event.stopPropagation();
        window.todo.model.deleteItem(itemIndex);
    }

    processSortItemsByTaskRequest() {
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    processSortItemsByDueDateRequest() {
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    processSortItemsByStatusRequest() {
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }
}