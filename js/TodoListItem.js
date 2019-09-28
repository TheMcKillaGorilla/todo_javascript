'use strict'
/**
 * TodoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
class TodoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor() {
        this.description = "Unknown";
        this.dueDate = new Date().toUTCString();
        this.assignedTo = "Unknown";
        this.completed = false;
    }

    // GETTER/SETTER METHODS

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        this.description = initDescription;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(initDueDate) {
        this.dueDate = initDueDate;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

    setAssignedTo(initAssignedTo) {
        this.assignedTo = initAssignedTo;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(initCompleted) {
        this.completed = initCompleted;
    }
}