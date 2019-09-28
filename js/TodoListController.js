'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoHTML.CLICK, this[TodoCallback.PROCESS_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_OWNER]);

        // THESE FOUR ON THE ITEM SCREEN ALL USE THE SAME EVENT HANDLER
        let controlsToRegister = [TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD, TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD, TodoGUIId.ITEM_DUE_DATE_PICKER, TodoGUIId.ITEM_COMPLETED_CHECKBOX];
        for (let i = 0; i < controlsToRegister.length; i++)
            this.registerEventHandler(controlsToRegister[i], TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_ITEM]);

        // THE SUBMIT AND CANCEL BUTTONS ON THE ITEM SCREEN
        this.registerEventHandler(TodoGUIId.ITEM_FORM_SUBMIT_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_SUBMIT_ITEM_CHANGES]);
        this.registerEventHandler(TodoGUIId.ITEM_FORM_CANCEL_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_ITEM_CHANGES]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(TodoGUIId.DIALOG_YES_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CONFIRM_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.DIALOG_NO_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_DELETE_LIST]);
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user clicks the Cancel
     * button while editing an item.
     */
    processCancelItemChanges() {
        // JUST GO BACK TO THE LIST SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded list.
     */
    processCancelDeleteList() {
        // JUST HIDE THE DIALOG
        window.todo.view.hideDialog();
    }

    /**
     * This function responds to when the user enters a key while
     * one of the item editing controls has focus.
     * 
     * @param {KeyboardEvent} event Object containing information about the key up event.
     */
    processChangeItem(event) {
        // WE'RE ONLY INTERESTED IN THE USER PRESSING ENTER
        if (event.keyCode === 13) {            
            // TRANSLATE THIS LOW-LEVEL EVENT INTO A HIGHER ORDER EVENT
            event.preventDefault();
            window.todo.controller.processSubmitItemChanges();
        }
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user changes the
     * owner of the list via the textfield.
     */
    processChangeOwner() {
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded list.
     */
    processConfirmDeleteList() {
        // DELETE THE LIST
        window.todo.model.removeList(window.todo.model.listToEdit);

        // GO BACK TO THE HOME SCREEN
        window.todo.model.goHome();

        // AND HIDE THE DIALOG
        window.todo.view.hideDialog();
    }

    /**
     * This function is called when the user requests to create
     * a new list item.
     */
    processCreateNewItem() {
        // LOAD A DEFAULT BRAND NEW ITEM INTO THE ITEM-EDITING CONTROLS
        window.todo.model.loadNewItem();

        // AND SWITCH SCREEN
        window.todo.model.goItem();
    }

    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks a delete
     * button on one of the items in the list being edited.
     * 
     * @param {Number} itemIndex Index of the item in the list.
     */
    processDeleteItem(itemIndex) {
        // THIS WILL PREVENT DOUBLE EVENT GENERATION SO THAT
        // WE ONLY RESPOND TO THE DELETE BUTTON CLICK
        event.stopPropagation();

        // REMOVE THE ITEM FROM THE LIST
        window.todo.model.deleteItem(itemIndex);
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteList() {
        // VERIFY VIA A DIALOG BOX
        window.todo.model.view.showDialog();
    }

    /**
     * This function responds to when the user clicks on an
     * item in a list in order to then edit it.
     * 
     * @param {Number} itemIndex Index of the item in the list
     */
    processEditItem(itemIndex) {
        // LOAD THE SELECTED ITEM'S DATA
        window.todo.model.loadItem(itemIndex);

        // GO TO THE ITEM SCREEN
        window.todo.model.goItem();
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }

    /**
     * This function is called when the user clicks the move down 
     * button on a given item in the list.
     * 
     * @param {Number} itemIndex Index of the item in the list
     */
    processMoveItemDown(itemIndex) {
        // THIS WILL PREVENT DOUBLE EVENT GENERATION SO THAT
        // WE ONLY RESPOND TO THE DELETE BUTTON CLICK
        event.stopPropagation();

        // MOVE THE ITEM DOWN THE LIST
        window.todo.model.moveDown(itemIndex);
    }

    /**
     * This function is called when the user clicks the move up 
     * button on a given item in the list.
     * 
     * @param {Number} itemIndex Index of the item in the list
     */
    processMoveItemUp(itemIndex) {
        // THIS WILL PREVENT DOUBLE EVENT GENERATION SO THAT
        // WE ONLY RESPOND TO THE DELETE BUTTON CLICK
        event.stopPropagation();

        // MOVE THE ITEM UP THE LIST
        window.todo.model.moveUp(itemIndex);
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Due Date header in the items table.
     */
    processSortItemsByDueDate() {
        // IF WE ARE CURRENTLY INCREASING BY DUE DATE SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Submit button in the item screen or when the user
     * presses enter when typing in one of the text fields.
     */
    processSubmitItemChanges() {
        // GET ALL THE ENTERED DATA
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

        // CHANGE BACK TO THE LIST SCREEN
        window.todo.model.goList();
    }
}