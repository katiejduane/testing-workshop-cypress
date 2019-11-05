/// <reference types="cypress" />

/**
 * Example TodoMVC page object
 */

export class TodoPage {
  static TODO_ITEM_ONE = 'buy some cheese'
  static TODO_ITEM_TWO = 'feed the cat'
  static TODO_ITEM_THREE = 'book a doctors appointment'

  //common selectors can be stored here... but what is the best practice for this?
  newTodo = '.new-todo'
  todoList = '.todo-list li'
  toggleBtn = '.toggle'
  filters = '.filters'
  clearCompleted = '.clear-completed'

  visit() {
    cy.visit('/')
  }

  createTodos() {
    cy.get(this.newTodo, {
        log: false
      })
      .type(`${TodoPage.TODO_ITEM_ONE}{enter}`, {
        log: false
      })
      .type(`${TodoPage.TODO_ITEM_TWO}{enter}`, {
        log: false
      })
      .type(`${TodoPage.TODO_ITEM_THREE}{enter}`, {
        log: false
      })

    cy.log('TodoPage: created todos')

    cy.get(this.todoList, {
      log: false
    }).as('todos')
  }

  createTodo(todo) {
    cy.get(this.newTodo, {
      log: false
    }).type(`${todo}{enter}`, {
      log: false
    })
    cy.log(`Created todo "${todo}"`)
    return cy
      .get('.todo-list', {
        log: false
      })
      .contains('li', todo.trim(), {
        log: false
      })
  }

  toggle(k) {
    cy.get(this.todoList, {
        log: false
      })
      .eq(k)
      .find(this.toggleBtn)
      .check()
  }

  /**
   * Returns either all todo items on the page,
   * or just a given one (zero index)
   */
  todos(k) {
    if (k !== undefined) {
      return cy.get(this.todoList).eq(k)
    }

    return cy.get(this.todoList)
  }

  filter(label) {
    cy.get(this.filters)
      .contains(label)
      .click()
  }

  clearCompleted() {
    cy.get(this.clearCompleted).click()
  }
}

export const todoPage = new TodoPage()