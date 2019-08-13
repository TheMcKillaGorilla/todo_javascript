class TodoListView {
    constructor(initModel) {
        this.model = initModel;
    }

    buildAddListItem() {
        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let addItemDiv = document.createElement(TodoHTML.DIV);
        addItemDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_ADD_CARD);
        addItemDiv.innerHTML = TodoSymbols.PLUS;
        let callbackArguments = [];
        this.setupCallback(addItemDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_NEW_ITEM_REQUEST, callbackArguments);
        return addItemDiv;
    }

    buildListItem(listItem, listItemIndex) {
        let newItemDiv = document.createElement(TodoHTML.DIV);
        newItemDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD);
        let itemArgs = [listItemIndex];
        this.setupCallback(newItemDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_EDIT_ITEM_REQUEST, itemArgs);

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let descriptionDiv = document.createElement(TodoHTML.DIV);
        descriptionDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_DESCRIPTION);
        descriptionDiv.innerHTML = listItem.getDescription();

        let assignedToDiv = document.createElement(TodoHTML.DIV);
        assignedToDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_ASSIGNED_TO);
        assignedToDiv.innerHTML =
            'Assigned To: ' + this.buildOpenTag(TodoHTML.STRONG) + listItem.getAssignedTo() + this.buildCloseTag(TodoHTML.STRONG);

        let dueDateDiv = document.createElement(TodoHTML.DIV);
        dueDateDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_DUE_DATE);
        dueDateDiv.innerHTML = listItem.getDueDate();

        let completedDiv = document.createElement(TodoHTML.DIV);
        if (listItem.isCompleted()) {
            completedDiv.innerHTML += "Completed";
            completedDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_COMPLETED);
        }
        else {
            completedDiv.innerHTML += "Pending";
            completedDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_NOT_COMPLETED);
        }

        let itemToolbar = document.createElement(TodoHTML.DIV);
        itemToolbar.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_TOOLBAR);

        let moveDownButton = document.createElement(TodoHTML.SPAN);
        moveDownButton.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_BUTTON);
        moveDownButton.innerHTML = TodoSymbols.MOVE_DOWN;
        this.setupCallback(moveDownButton, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_DOWN_REQUEST, itemArgs);

        let moveUpButton = document.createElement(TodoHTML.SPAN);
        moveUpButton.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_BUTTON);
        moveUpButton.innerHTML = TodoSymbols.MOVE_UP;
        this.setupCallback(moveUpButton, TodoHTML.ONCLICK, TodoCallback.PROCESS_MOVE_ITEM_UP_REQUEST, itemArgs);

        let deleteButton = document.createElement(TodoHTML.SPAN);
        deleteButton.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_CARD_BUTTON);
        deleteButton.innerHTML = TodoSymbols.DELETE;
        this.setupCallback(deleteButton, TodoHTML.ONCLICK, TodoCallback.PROCESS_DELETE_ITEM_REQUEST, itemArgs);

        itemToolbar.appendChild(moveDownButton);
        itemToolbar.appendChild(moveUpButton);
        itemToolbar.appendChild(deleteButton);

        // THESE THREE SPANS GO IN THE DETAILS DIV
        newItemDiv.appendChild(descriptionDiv);
        newItemDiv.appendChild(assignedToDiv);
        newItemDiv.appendChild(dueDateDiv);
        newItemDiv.appendChild(completedDiv);
        newItemDiv.appendChild(itemToolbar);

        return newItemDiv;
    }

    buildListItemsHeader() {
        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let listItemHeaderDiv = document.createElement(TodoHTML.DIV);
        listItemHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_HEADER_CARD);

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let taskHeaderDiv = document.createElement(TodoHTML.DIV);
        taskHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_TASK_HEADER);
        taskHeaderDiv.innerHTML = "Task";
        let callbackArguments = [];
        this.setupCallback(taskHeaderDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_SORT_ITEMS_BY_TASK_REQUEST, callbackArguments);

        let dueDateHeaderDiv = document.createElement(TodoHTML.DIV);
        dueDateHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_DUE_DATE_HEADER);
        dueDateHeaderDiv.innerHTML = 'Due Date';
        this.setupCallback(dueDateHeaderDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_SORT_ITEMS_BY_DUE_DATE_REQUEST, callbackArguments);

        let statusHeaderDiv = document.createElement(TodoHTML.DIV);
        statusHeaderDiv.setAttribute(TodoHTML.CLASS, TodoGUIClass.LIST_ITEM_STATUS_HEADER);
        statusHeaderDiv.innerHTML = 'Status';
        this.setupCallback(statusHeaderDiv, TodoHTML.ONCLICK, TodoCallback.PROCESS_SORT_ITEMS_BY_STATUS_REQUEST, callbackArguments);

        // THESE THREE SPANS GO IN THE DETAILS DIV
        listItemHeaderDiv.appendChild(taskHeaderDiv);
        listItemHeaderDiv.appendChild(dueDateHeaderDiv);
        listItemHeaderDiv.appendChild(statusHeaderDiv);
        return listItemHeaderDiv;
    }

    buildListLink(listName) {
        let newA = document.createElement(TodoHTML.A);
        newA.setAttribute(TodoHTML.CLASS, TodoGUIClass.HOME_LIST_LINK);
        newA.setAttribute('href', '#');
        newA.innerHTML = listName;
        let br = document.createElement(TodoHTML.BR);
        newA.appendChild(br);
        let callbackArguments = [listName];
        this.setupCallback(newA, TodoHTML.ONCLICK, TodoCallback.PROCESS_EDIT_LIST_REQUEST, callbackArguments);
        return newA;
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

    loadItems(listToLoad) {
        let listItemsDiv = document.getElementById(TodoGUIId.LIST_ITEMS_CONTAINER);
        this.removeAllChildren(listItemsDiv);

        let listItemsHeaderDiv = this.buildListItemsHeader();
        listItemsDiv.appendChild(listItemsHeaderDiv);

        // LOAD THE ITEM CARDS
        for (let i = 0; i < listToLoad.items.length; i++) {
            let item = listToLoad.items[i];
            let itemCard = this.buildListItem(item, i);
            listItemsDiv.appendChild(itemCard);
        }

        // LOAD THE ADD ITEM CARD
        let addCard = this.buildAddListItem();
        listItemsDiv.appendChild(addCard);
    }

    loadListData(listToLoad) {
        let listNameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        listNameTextField.value = listToLoad.getName();
        let listOwnerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        listOwnerTextField.value = listToLoad.getOwner();
        this.loadItems(listToLoad);
    }

    appendListLink(listToAppend) {
        let yourListsList = document.getElementById(TodoGUIId.HOME_YOUR_LISTS_LIST);
        let listName = listToAppend.getName();
        let newA = this.buildListLink(listName);
        yourListsList.appendChild(newA);
        let newBr = document.createElement(TodoHTML.BR);
        yourListsList.appendChild(newBr);
    }

    loadListLinks(todoLists) {
        let yourListsList = document.getElementById(TodoGUIId.HOME_YOUR_LISTS_LIST);
        this.removeAllChildren(yourListsList);
        for (let i = 0; i < todoLists.length; i++) {
            let todoList = todoLists[i];
            this.appendListLink(todoList);
        }
    }

    removeAllChildren(node) {
        if (!node)
            console.log("WHAT?");
        let child = node.firstElementChild;
        while (child) {
            child.remove();
            child = node.firstElementChild;
        }
    }

    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    showElement(element, show) {
        if (!element)
            console.log("WHAT?");
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

    showElementWithId(elementId, show) {
        let element = document.getElementById(elementId);
        this.showElement(element, show);
    }

    buildOpenTag(tagName) {
        return "<" + tagName + ">";
    }

    buildCloseTag(tagName) {
        return "</" + tagName + ">";
    }

    hideDialog() {
        let dialog = document.getElementById("modal1");
        dialog.classList.remove("is-visible");
    }

    showDialog() {
        let dialog = document.getElementById("modal1");
        dialog.classList.add("is-visible");
/*        const openEls = document.querySelectorAll("[data-open]");
        const closeEls = document.querySelectorAll("[data-close]");
        const isVisible = "is-visible";

        for (const el of openEls) {
            el.addEventListener("click", function () {
                const modalId = this.dataset.open;
                document.getElementById(modalId).classList.add(isVisible);
            });
        }

        for (const el of closeEls) {
            el.addEventListener("click", function () {
                this.parentElement.parentElement.parentElement.classList.remove(isVisible);
            });
        }

        document.addEventListener("click", e => {
            if (e.target == document.querySelector(".modal.is-visible")) {
                document.querySelector(".modal.is-visible").classList.remove(isVisible);
            }
        });

        document.addEventListener("keyup", e => {
            // if we press the ESC
            if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
                document.querySelector(".modal.is-visible").classList.remove(isVisible);
            }
        });*/
    }
}