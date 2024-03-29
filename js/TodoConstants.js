'use strict'
/**
 * TodoConstants.js
 * 
 * This file lists all the constants used by this application for 
 * setting up and using the user interface. Note that constants are
 * useful for abstracting GUI controls. Using constants helps us to
 * avoid spelling errors in string literals and will also make it
 * easier for us to change the language used by our site. One goal
 * for this Web application is not to use any string literals inside
 * of functions, but rather to cite appropriate string constants
 * when suitable.
 * 
 * @author McKilla Gorilla
 */

 /**
  * TodoSymbols - these are the HTML symbols we'll use in our application. Note
  * that combined with different fonts HTML has a number of symbols that can be
  * use in place of icons. They are easy to use, are language independent,
  * and scale well.
  */
const TodoSymbols = {
    DELETE: "&#10005;",     // TRASH SYMBOL
    MOVE_DOWN: "&#x21e9;",  // DOWN ARROW
    MOVE_UP: "&#x21e7;",    // UP ARROW
    PLUS: "&#x2b;"          // PLUS
};

/**
 * TodoHTML - these are html elements, attributes, and events that will be needed
 * to generate the appropriate text for our site pages.
 */
const TodoHTML = {
    A: "a",
    BR: "br",
    CLASS: "class",
    CLICK: "click",
    DIV: "div",
    ID: "id",
    KEYUP: "keyup",
    ONCLICK: "onclick",
    SPAN: "span",
    STRONG: "strong"
};

/**
 * TodoGUIId - these are the unique identifiers we will use to label
 * each control in our user interface such that we may retrieve them
 * as needed to set them up, update their display, or properly handle 
 * events.
 */
const TodoGUIId = {
    // IDs FOR SCREENS
    TODO_HOME: 'todo_home',
    TODO_LIST: 'todo_list',
    TODO_ITEM: 'todo_item',

    // IDs FOR HOME SCREEN CONTROLS
    HOME_YOUR_LISTS_CONTAINER: 'home_your_lists_container',
    HOME_YOUR_LISTS_HEADING: 'home_your_lists_heading',
    HOME_YOUR_LISTS_LIST: 'home_your_lists_list',
    HOME_BANNER_CONTAINER: 'home_banner_container',
    HOME_BANNER_IMAGE: 'home_banner_image',
    HOME_NEW_LIST_CONTAINER: 'home_new_list_container',
    HOME_NEW_LIST_BUTTON: 'home_new_list_button',

    // IDs FOR LIST SCREEN CONTROLS
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
    ITEM_CARD_: 'item_card_', // THIS IS A PARTIAL ID USED FOR BUILDING IDs FOR ITEM CARDS
    _MOVE_UP_BUTTON: "_move_up_button",
    _MOVE_DOWN_BUTTON: "_move_down_button",
    _DELETE_BUTTON: "_delete_button",

    // IDs FOR ITEM SCREEN CONTROLS
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

    // IDs FOR THE DIALOG
    MODAL_YES_NO_DIALOG: "modal_yes_no_dialog",
    DIALOG_YES_BUTTON: 'dialog_yes_button',
    DIALOG_NO_BUTTON: 'dialog_no_button'
};

/**
 * TodoGUIClass - these are the html style classes we'll use for
 * our GUI controls. We'll need these so our style sheets can consistently
 * size, locate, and stylize our user interface controls.
 */
const TodoGUIClass = {
    // HOME SCREEN CLASSes
    HOME_LIST_LINK: "home_list_link",

    // LIST SCREEN CLASSes
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

    // ITEM SCREEN CLASSes
    ITEM_PROMPT: "item_prompt",
    ITEM_INPUT: "item_input",
    ITEM_CARD: "item_card",
    ITEM_BUTTON: "item_button",

    // USED FOR THE DIALOG
    IS_VISIBLE: "is_visible",
    DISABLED: "disabled"
};

/**
 * TodoCallback - these are the functions we'll define that will be
 * called in response to interactions with GUI controls.
 */
const TodoCallback = {
    // SOME CALLBACKS ARE SETUP AT THE START BECAUSE THE 
    // CONTROLS ARE DECLARED INSIDE index.html
    PROCESS_CREATE_NEW_LIST: "processCreateNewList",
    PROCESS_GO_HOME: "processGoHome",
    PROCESS_DELETE_LIST: "processDeleteList",
    PROCESS_CHANGE_NAME: "processChangeName",
    PROCESS_CHANGE_OWNER: "processChangeOwner",
    PROCESS_CHANGE_ITEM: "processChangeItem",
    PROCESS_SUBMIT_ITEM_CHANGES: "processSubmitItemChanges",
    PROCESS_CANCEL_ITEM_CHANGES: "processCancelItemChanges",
    PROCESS_CONFIRM_DELETE_LIST: "processConfirmDeleteList",
    PROCESS_CANCEL_DELETE_LIST: "processCancelDeleteList",

    // AND OTHERS ARE SETUP DYNAMICALLY IN RESPONSE TO EVENTS,
    // FOR THESE WE'LL NEED TO LOCATE EVENT HANDLER FUNCTIONS
    // USING THEIR FULL PATH
    PROCESS_DELETE_ITEM: "window.todo.controller.processDeleteItem",
    PROCESS_EDIT_ITEM: "window.todo.controller.processEditItem",
    PROCESS_EDIT_LIST: "window.todo.controller.processEditList",
    PROCESS_MOVE_ITEM_DOWN: "window.todo.controller.processMoveItemDown",
    PROCESS_MOVE_ITEM_UP: "window.todo.controller.processMoveItemUp",
    PROCESS_CREATE_NEW_ITEM: "window.todo.controller.processCreateNewItem",
    PROCESS_SORT_ITEMS_BY_TASK: "window.todo.controller.processSortItemsByTask",
    PROCESS_SORT_ITEMS_BY_DUE_DATE: "window.todo.controller.processSortItemsByDueDate",
    PROCESS_SORT_ITEMS_BY_STATUS: "window.todo.controller.processSortItemsByStatus"
};

/**
 * ItemSortCriteria - these are the different criteria that can be used for
 * sorting the items in a list's items table.
 */
const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
};