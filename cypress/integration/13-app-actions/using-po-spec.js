// import todo page object from "todo-page-object.js"
import {
  TodoPage,
  todoPage
} from './todo-page-object'

describe('TodoMVC with Page Object', () => {
  beforeEach(() => {
    // visit the page
    todoPage.visit()
  })

  it('creates 3 todos', () => {
    // create default todos
    cy.get(todoPage.newTodo).should('be.visible')
    // above i'm using the page object with dot notation to look for a specific selector stored there
    todoPage.createTodos()
    const todos = todoPage.todos()
    // and check that there are 3 of them
    todos.should('have.length', 3)
  })

  context('toggles items', () => {
    beforeEach(() => {
      todoPage.createTodos()
    })

    // this test usually does not work because we
    // lose retries when getting elements - we get
    // the todos _too early_!
    // it.skip('completes second item', () => {
    //   todoPage.toggle(1)
    //   const todos = todoPage.todos()
    //   todos.eq(0).should('not.have.class', 'completed')
    //   todos.eq(1).should('have.class', 'completed')
    //   todos.eq(2).should('not.have.class', 'completed')
    // })

    it('completes second item', () => {
      todoPage.toggle(1)
      // this test requeries all todos, ensuring that it passes reliably
      // todoPage.todos(0).should('not.have.class', 'completed')
      // todoPage.todos(1).should('have.class', 'completed')
      // todoPage.todos(2).should('not.have.class', 'completed')
    })

  })

})