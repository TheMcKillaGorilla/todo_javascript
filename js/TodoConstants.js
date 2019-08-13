const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};

const TodoSymbols = {
    DELETE: "&#10005;",
    MOVE_DOWN: "&#x21e9;",
    MOVE_UP: "&#x21e7;",
    PLUS: "&#x2b;"
};

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
    // IDS FOR SCREENS
    TODO_HOME: 'todo_home',
    TODO_LIST: 'todo_list',
    TODO_ITEM: 'todo_item',

    // IDS FOR HOME SCREEN CONTROLS
    HOME_YOUR_LISTS_CONTAINER: 'home_your_lists_container',
    HOME_YOUR_LISTS_HEADING: 'home_your_lists_heading',
    HOME_YOUR_LISTS_LIST: 'home_your_lists_list',
    HOME_BANNER_CONTAINER: 'home_banner_container',
    HOME_BANNER_IMAGE: 'home_banner_image',
    HOME_NEW_LIST_CONTAINER: 'home_new_list_container',
    HOME_NEW_LIST_BUTTON: 'home_new_list_button',

    // IDS FOR LIST SCREEN CONTROLS
    LIST_HEADING: 'list_heading',
    LIST_TRASH: 'list_trash',
    LIST_DETAILS_CONTAINER: 'list_details_container',
    LIST_DETAILS_NAME_CONTAINER: 'list_details_name_container',
    LIST_NAME_PROMPT: 'list_name_prompt',
    LIST_NAME_TEXTFIELD: 'list_name_textfield',
    LIST_DETAILS_OWNER_CONTAINER: 'list_details_owner_container',
    LIST_OWNER_PROMPT: "list_owner_prompt",
    LIST_OWNER_TEXTFIELD: 'list_owner_textfield',
    LIST_ITEMS_CONTAINER: 'list_items_container',

    // IDS FOR ITEM SCREEN CONTROLS
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
    ITEM_FORM_CANCEL_BUTTON: 'item_form_cancel_button',

    // IDS FOR THE MODAL
    MODAL_YES_BUTTON: 'modal_yes_button',
    MODAL_NO_BUTTON: 'modal_no_button'
};

const TodoGUIClass = {
    // HOME SCREEN CLASSES
    HOME_LIST_LINK: "home_list_link",

    // LIST SCREEN CLASSES
    LIST_ITEM_CARD: "list_item_card",
    LIST_ITEM_ADD_CARD: "list_item_add_card",
    LIST_ITEM_HEADER_CARD: "list_item_header_card",
    LIST_ITEM_TASK_HEADER: "list_item_task_header",
    LIST_ITEM_DUE_DATE_HEADER: "list_item_due_date_header",
    LIST_ITEM_STATUS_HEADER: "list_item_status_header",
    LIST_ITEM_CARD_DESCRIPTION: "list_item_card_description",
    LIST_ITEM_CARD_ASSIGNED_TO: "list_item_card_assigned_to",
    LIST_ITEM_CARD_DUE_DATE: "list_item_card_due_date",
    LIST_ITEM_CARD_COMPLETED: "list_item_card_completed",
    LIST_ITEM_CARD_NOT_COMPLETED: "list_item_card_not_completed",
    LIST_ITEM_CARD_TOOLBAR: "list_item_card_toolbar",
    LIST_ITEM_CARD_BUTTON: "list_item_card_button",

    // ITEM SCREEN CLASSES
    ITEM_PROMPT: "item_prompt",
    ITEM_INPUT: "item_input",
    ITEM_CARD: "item_card"
};

const TodoGUIEventName = {
    KEYUP: "keyup",
    CLICK: "click"
};

const TodoCallback = {
    // SOME CALLBACKS ARE SETUP AT THE START BECAUSE THE 
    // CONTROLS ARE DECLARED INSIDE index.html
    PROCESS_NEW_LIST_REQUEST: "processNewListRequest",
    PROCESS_HOME_REQUEST: "processHomeRequest",
    PROCESS_DELETE_LIST_REQUEST: "processDeleteListRequest",
    PROCESS_NAME_CHANGE_REQUEST: "processNameChangeRequest",
    PROCESS_OWNER_CHANGE_REQUEST: "processOwnerChangeRequest",
    PROCESS_ITEM_CHANGES_REQUEST: "processItemChangesRequest",
    PROCESS_SUBMIT_ITEM_CHANGES_REQUEST: "processSubmitItemChangesRequest",
    PROCESS_CANCEL_ITEM_CHANGES_REQUEST: "processCancelItemChangesRequest",
    PROCESS_YES_DELETE_REQUEST: "processYesDeleteRequest",
    PROCESS_NO_DELETE_REQUEST: "processNoDeleteRequest",

    // AND OTHERS ARE SETUP DYNAMICALLY IN RESPONSE TO EVENTS,
    // FOR THESE WE'LL NEED TO LOCATE EVENT HANDLER FUNCTIONS
    // USING THEIR FULL PATH
    PROCESS_DELETE_ITEM_REQUEST: "window.todo.controller.processDeleteItemRequest",
    PROCESS_EDIT_ITEM_REQUEST: "window.todo.controller.processEditItemRequest",
    PROCESS_EDIT_LIST_REQUEST: "window.todo.controller.processEditListRequest",
    PROCESS_MOVE_ITEM_DOWN_REQUEST: "window.todo.controller.processMoveItemDownRequest",
    PROCESS_MOVE_ITEM_UP_REQUEST: "window.todo.controller.processMoveItemUpRequest",
    PROCESS_NEW_ITEM_REQUEST: "window.todo.controller.processNewItemRequest",
    PROCESS_SORT_ITEMS_BY_TASK_REQUEST: "window.todo.controller.processSortItemsByTaskRequest",
    PROCESS_SORT_ITEMS_BY_DUE_DATE_REQUEST: "window.todo.controller.processSortItemsByDueDateRequest",
    PROCESS_SORT_ITEMS_BY_STATUS_REQUEST: "window.todo.controller.processSortItemsByStatusRequest"
};