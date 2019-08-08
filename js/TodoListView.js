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

    buildListLink(listName) {
        let newA = document.createElement('a');
        newA.setAttribute('href', '#');
        newA.innerHTML = listName;
        let clickText = "window.todo.controller.processEditListRequest('" + listName + "')";
        newA.setAttribute('onclick', clickText);
        return newA;
    }

    buildListItem(listItem, listItemIndex) {  
        let newItemDiv = document.createElement('div');
        newItemDiv.setAttribute('class', 'list_item_card');
        let clickText = "window.todo.controller.processEditItemRequest('" + listItemIndex + "')";
        newItemDiv.setAttribute('onclick', clickText);

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let headingDiv = document.createElement('div');
        headingDiv.setAttribute('class', 'list_item_card_heading');
        headingDiv.innerHTML = listItem.getDescription();

        let assignedToDiv = document.createElement('div');
        assignedToDiv.setAttribute('class', 'list_item_card_details_1');
        assignedToDiv.innerHTML = '<strong>Assigned To: </strong>' + listItem.getAssignedTo();

        let dueDateDiv = document.createElement('div');
        dueDateDiv.setAttribute('class', 'list_item_card_details_2');
        dueDateDiv.innerHTML = '<strong>Due Date: </strong>' + listItem.getDueDate();

        let completedDiv = document.createElement('div');
        completedDiv.setAttribute('class', 'list_item_card_details_3');
        if (listItem.isCompleted()) {
            completedDiv.innerHTML += "<strong style='color:green'>Completed</strong>";
        }
        else {
            completedDiv.innerHTML += "<strong style='color:red'>Pending</strong>";
        }
        
        let itemToolbar = document.createElement('div');
        itemToolbar.setAttribute('class', 'list_item_card_toolbar');
        let moveDownButton = document.createElement('span');
        moveDownButton.setAttribute('class', 'list_item_card_button');        
        moveDownButton.innerHTML = "&#x21e9;";
        clickText = "window.todo.controller.processMoveItemDownRequest(event, '" + listItemIndex + "')";
        moveDownButton.setAttribute('onclick', clickText);
        let moveUpButton = document.createElement('span');
        moveUpButton.setAttribute('class', 'list_item_card_button');
        moveUpButton.innerHTML = "&#x21e7;";
        clickText = "window.todo.controller.processMoveItemUpRequest(event, '" + listItemIndex + "')";
        moveUpButton.setAttribute('onclick', clickText);
        let deleteButton = document.createElement('span');
        deleteButton.setAttribute('class', 'list_item_card_button');
        deleteButton.innerHTML = "&#10005;";
        clickText = "window.todo.controller.processDeleteItemRequest(event, '" + listItemIndex + "')";
        deleteButton.setAttribute('onclick', clickText);
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
        let newItemDiv = document.createElement('div');
        newItemDiv.setAttribute('class', 'list_item_card');
        let clickText = "window.todo.controller.processNewItemRequest()";
        newItemDiv.setAttribute('onclick', clickText);

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let plusDiv = document.createElement('div');
        plusDiv.setAttribute('class', 'list_item_card_plus');
        plusDiv.innerHTML = "+";

        // THESE THREE SPANS GO IN THE DETAILS DIV
        newItemDiv.appendChild(plusDiv);

        return newItemDiv;
    }
    
    loadListLinks(todoLists) {
        let linksText = "";
        let yourListList = document.getElementById("your_list_list");
        this.removeAllChildren(yourListList);
        for (let i = 0; i < todoLists.length; i++) {
            let todoList = todoLists[i];
            let listName = todoList.getName();
            let newA = this.buildListLink(listName);
            yourListList.appendChild(newA);
            let newBr = document.createElement('br');
            yourListList.appendChild(newBr);
        }
    }

    loadListData(listToLoad) {
        let listNameTextField = document.getElementById("list_name_input");
        listNameTextField.value = listToLoad.getName();
        let listOwnerTextField = document.getElementById("list_owner_input");
        listOwnerTextField.value = listToLoad.getOwner();
        this.loadItems(listToLoad);
    }

    loadItems(listToLoad) {
        let listItemsDiv = document.getElementById("list_items_list");
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
        let descriptionTextField = document.getElementById("item_description");
        descriptionTextField.value = itemToLoad.getDescription();
        let assignedToTextField = document.getElementById("item_assigned_to");
        assignedToTextField.value = itemToLoad.getAssignedTo();
        let dueDatePicker = document.getElementById("item_due_date");
        dueDatePicker.value = itemToLoad.getDueDate();
        let completedCheckbox = document.getElementById("item_completed");
        completedCheckbox.checked = itemToLoad.isCompleted();
    }
}