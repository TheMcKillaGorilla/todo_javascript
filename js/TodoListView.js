class TodoListView {
    constructor(initModel) {
        this.model = initModel;
    }

    showElementWithId(elementId, show) {
        let element = document.getElementById(elementId);
        this.showElement(element, show);
    }

    showElement(element, show) {
        element.hidden = !show;
        if (show)
            console.log(element);

        // NOW HIDE FROM ALL THE CHILDREN
        if (element.hasChildNodes()) {
            for (let i = 0; i < element.childNodes.length; i++) {
                var child = element.childNodes[i];
                this.showElement(child, show);
            }
        }
    }

    removeAllChildren(node) {
        let child = node.firstElementChild;
        while(child) {
            child.remove();
            child = node.firstElementChild;
        }
    }

    buildOpenTag(tagName) {
        return "<" + tagName + ">";
    }

    buildCloseTag(tagName) {
        return "</" + tagName + ">";
    }

    buildFunctionCallText(functionName, args) {
        let functionCallText = functionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length-1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        return functionCallText;
    }

    buildListLink(listName) {
        let newA = document.createElement(TodoHTML.A);
        newA.setAttribute('href', '#');
        newA.innerHTML = listName;
        let callbackArguments = [listName];
        let clickText = this.buildFunctionCallText(TodoCallback.PROCESS_EDIT_LIST_REQUEST, callbackArguments);
        newA.setAttribute(TodoHTML.ONCLICK, clickText);
        return newA;
    }

    buildListItem(listItem, listItemIndex) {  
        let newItemDiv = document.createElement(TodoHTML.DIV);
        newItemDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.ITEM_CARD);
        let clickText = "window.todo.controller.processEditItemRequest('" + listItemIndex + "')";
        newItemDiv.setAttribute(TodoHTML.ONCLICK, clickText);

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let headingDiv = document.createElement(TodoHTML.DIV);
        headingDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.ITEM_CARD_HEADING);
        headingDiv.innerHTML = listItem.getDescription();

        let assignedToDiv = document.createElement(TodoHTML.DIV);
        assignedToDiv.setAttribute(TodoHTML.CLASS, 'list_item_card_details_1');
        assignedToDiv.innerHTML = '<strong>Assigned To: </strong>' + listItem.getAssignedTo();

        let dueDateDiv = document.createElement(TodoHTML.DIV);
        dueDateDiv.setAttribute(TodoHTML.CLASS, 'list_item_card_details_2');
        dueDateDiv.innerHTML = '<strong>Due Date: </strong>' + listItem.getDueDate();

        let completedDiv = document.createElement(TodoHTML.DIV);
        completedDiv.setAttribute(TodoHTML.CLASS, 'list_item_card_details_3');
        if (listItem.isCompleted()) {
            completedDiv.innerHTML += "<strong style='color:green'>Completed</strong>";
        }
        else {
            completedDiv.innerHTML += "<strong style='color:red'>Pending</strong>";
        }
        
        let itemToolbar = document.createElement(TodoHTML.DIV);
        itemToolbar.setAttribute(TodoHTML.CLASS, 'list_item_card_toolbar');
        let moveDownButton = document.createElement(TodoHTML.SPAN);
        moveDownButton.setAttribute(TodoHTML.CLASS, TodoGUIClass.TODO_ITEM_CARD_BUTTON);        
        moveDownButton.innerHTML = TodoSymbols.MOVE_DOWN;
        clickText = "window.todo.controller.processMoveItemDownRequest(event, '" + listItemIndex + "')";
        moveDownButton.setAttribute(TodoHTML.ONCLICK, clickText);
        let moveUpButton = document.createElement(TodoHTML.SPAN);
        moveUpButton.setAttribute(TodoHTML.CLASS, TodoGUIClass.TODO_ITEM_CARD_BUTTON);
        moveUpButton.innerHTML = TodoSymbols.MOVE_UP;
        clickText = "window.todo.controller.processMoveItemUpRequest(event, '" + listItemIndex + "')";
        moveUpButton.setAttribute(TodoHTML.ONCLICK, clickText);
        let deleteButton = document.createElement(TodoHTML.SPAN);
        deleteButton.setAttribute(TodoHTML.CLASS, TodoGUIClass.TODO_ITEM_CARD_BUTTON);
        deleteButton.innerHTML = TodoSymbols.DELETE;
        clickText = "window.todo.controller.processDeleteItemRequest(event, '" + listItemIndex + "')";
        deleteButton.setAttribute(TodoHTML.ONCLICK, clickText);
        itemToolbar.appendChild(moveDownButton);
        itemToolbar.appendChild(moveUpButton);
        itemToolbar.appendChild(deleteButton);

        // THESE THREE SPANS GO IN THE DETAILS DIV
        newItemDiv.appendChild(headingDiv);
        newItemDiv.appendChild(assignedToDiv);
        newItemDiv.appendChild(dueDateDiv);
        newItemDiv.appendChild(completedDiv);
        newItemDiv.appendChild(itemToolbar);

        return newItemDiv;
    }

    buildAddListItem() {  
        let newItemDiv = document.createElement(TodoHTML.DIV);
        newItemDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.TODO_ITEM_CARD);
        let callbackArguments = [];
        let clickText = this.buildFunctionCallText(TodoCallback.PROCESS_NEW_ITEM_REQUEST, callbackArguments);
        newItemDiv.setAttribute(TodoHTML.ONCLICK, clickText);

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let plusDiv = document.createElement(TodoHTML.DIV);
        plusDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.TODO_ITEM_PLUS_CARD);
        plusDiv.innerHTML = TodoSymbols.PLUS;

        // THESE THREE SPANS GO IN THE DETAILS DIV
        newItemDiv.appendChild(plusDiv);

        return newItemDiv;
    }
    
    loadListLinks(todoLists) {
        let yourListList = document.getElementById(TodoGUIId.HOME_YOUR_LISTS_LIST);
        this.removeAllChildren(yourListList);
        for (let i = 0; i < todoLists.length; i++) {
            let todoList = todoLists[i];
            let listName = todoList.getName();
            let newA = this.buildListLink(listName);
            yourListList.appendChild(newA);
            let newBr = document.createElement(TodoHTML.BR);
            yourListList.appendChild(newBr);
        }
    }

    loadListData(listToLoad) {
        let listNameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        listNameTextField.value = listToLoad.getName();
        let listOwnerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        listOwnerTextField.value = listToLoad.getOwner();
        this.loadItems(listToLoad);
    }

    loadItems(listToLoad) {
        let listItemsDiv = document.getElementById(TodoGUIId.LIST_LIST_ITEMS_CONTAINER);
        this.removeAllChildren(listItemsDiv);

        // LOAD THE ADD ITEM CARD
        let plusCard = this.buildAddListItem();
        listItemsDiv.appendChild(plusCard);

        // LOAD THE ITEM CARDS
        for (let i = 0; i < listToLoad.items.length; i++) {
            let item = listToLoad.items[i];
            let itemCard = this.buildListItem(item, i);
            listItemsDiv.appendChild(itemCard);
        }
    }

    loadItemData(itemToLoad) {
        let descriptionTextField = document.getElementById(TodoGUIId.ITEM_DESCRIPTION_TEXTFIELD);
        descriptionTextField.value = itemToLoad.getDescription();
        let assignedToTextField = document.getElementById(TodoGUIId.ITEM_ASSIGNED_TO_TEXTFIELD);
        assignedToTextField.value = itemToLoad.getAssignedTo();
        let dueDatePicker = document.getElementById(TodoGUIId.ITEM_DUE_DATE_PICKER);
        dueDatePicker.value = itemToLoad.getDueDate();
        let completedCheckbox = document.getElementById(TodoGUIId.ITEM_COMPLETED_CHECKBOX);
        completedCheckbox.checked = itemToLoad.isCompleted();
    }
}