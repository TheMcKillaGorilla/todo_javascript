const TodoSymbols = {
    DELETE: "&#10005;",
    MOVE_DOWN: "&#x21e9;",
    MOVE_UP: "&#x21e7;",
    PLUS: "&#x2b;"
}
const TodoHTML = {
    A: "a",
    BR: "br",
    CLASS: "class",
    DIV: "div",
    ONCLICK: "onclick",
    SPAN: "span",
    STRONG: "strong"
};

const TodoGUIId = {
    // SCREEN IDs
    TODO_HOME: 'todo_home',
    TODO_LIST: 'todo_list',
    TODO_ITEM: 'todo_item',

    // HOME SCREEN IDs
    HOME_YOUR_LISTS_CONTAINER: 'home_your_lists_container',
    HOME_YOUR_LISTS_HEADING: 'home_your_lists_heading',
    HOME_YOUR_LISTS_LIST: 'home_your_lists_list',
    HOME_BANNER_CONTAINER: 'home_banner_container',
    HOME_BANNER_IMAGE: 'home_banner_image',
    HOME_NEW_LIST_CONTAINER: 'home_new_list_container',
    HOME_NEW_LIST_BUTTON: 'home_new_list_button',

    // LIST SCREEN IDs
    LIST_HEADING: 'list_heading',
    LIST_DETAILS_CONTAINER: 'list_details_container',
    LIST_DETAILS_NAME_CONTAINER: 'list_details_name_container',
    LIST_NAME_PROMPT: 'list_name_prompt',
    LIST_NAME_TEXTFIELD: 'list_name_textfield',
    LIST_DETAILS_OWNER_CONTAINER: 'list_details_owner_container',
    LIST_OWNER_PROMPT: "list_owner_prompt",
    LIST_OWNER_TEXTFIELD: 'list_owner_textfield',
    LIST_LIST_ITEMS_CONTAINER: 'list_items_container',

    // ITEM SCREEN IDs
    ITEM_HEADING: 'item_heading',
    ITEM_FORM_CONTAINER: 'item_form_container',
    ITEM_DESCRIPTION_PROMPT: 'item_description_prompt',
    ITEM_DESCRIPTION_TEXTFIELD: 'item_description_textfield',
    ITEM_ASSIGNED_TO_PROMPT: 'item_assigned_to_prompt',
    ITEM_ASSIGNED_TO_TEXTFIELD: 'item_assigned_to_textfield',
    ITEM_DUE_DATE_PROMPT: 'item_due_date_prompt',
    ITEM_DUE_DATE_PICKER: 'item_due_date_picker',
    ITEM_COMPLETED_PROMPT: 'item_completed_prompt',
    ITEM_COMPLETED_CHECKBOX: 'item_completed_checkbox',
    ITEM_FORM_SUBMIT_BUTTON: 'item_form_submit_button',
    ITEM_FORM_CANCEL_BUTTON: 'item_form_cancel_button'
};

const TodoGUIClass = {
    // ITEM SCREEN CLASSES
    ITEM_PROMPT: "item_prompt",
    ITEM_INPUT: "item_input",
    ITEM_CARD: "item_card",
    ITEM_CARD_HEADING: "item_card_heading",
    ITEM_CARD_BUTTON: "item_card_button",
    ITEM_PLUS_CARD: "item_plus_card"
};

const TodoCallback = {
    PROCESS_EDIT_LIST_REQUEST: "window.todo.controller.processEditListRequest",
    PROCESS_NEW_ITEM_REQUEST: "window.todo.controller.processNewItemRequest"
};