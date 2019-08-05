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

    buildListLink(listName) {
        let newA = document.createElement('a');
        newA.setAttribute('href', '#');
        newA.innerHTML = listName;
        let clickText = "window.todo.controller.processEditListRequest('" + listName + "')";
        newA.setAttribute('onclick', clickText);
        return newA;
    }

    buildListItem(listItem) {
        let newItem = document.createElement('div');
        newItem.setAttribute('class', 'list_item_card');

        // WE'LL PUT ITEMS INTO THIS CARD IN A GRID
        let nameText = document.createElement('span');
        nameText.setAttribute('class', 'list_item_card_heading');
        nameText.innerHTML = listItem.getDescription();
        
        newItem.appendChild(nameText);

        return newItem;
    }
    
    loadListLinks(todoLists) {
        let linksText = "";
        let yourListList = document.getElementById("your_list_list");
        while(yourListList.firstChild) {
            yourListList.removeChild(yourListList.firstChild);
        }
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

        let listItemsDiv = document.getElementById("list_items_list");
        while (listItemsDiv.firstChild)
            listItemsDiv.remove(listItemsDiv.firstChild);

        // LOAD THE ITEM CARDS
        for (let i = 0; i < listToLoad.items.length; i++) {
            let item = listToLoad.items[i];
            let itemCard = this.buildListItem(item);
            listItemsDiv.appendChild(itemCard);
        }
    }
}