/// <reference types="cypress" />

beforeEach(() => {
  cy.request('POST', '/reset', {
    todos: []
  })
})

beforeEach(() => {
  cy.visit('/')
})
/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = text => {
  cy.get('.new-todo').type(`${text}{enter}`)
}
it('adds two items', () => {
  addItem('first NEW item')
  addItem('second NEW item')
  cy.get('li.todo').should('have.length', 2)
})