/// <reference types="cypress" />
it('loads', () => {
  // application should be running at port 3000
  cy.visit('localhost:3000')
  cy.contains('h1', 'todos')
})

it('starts with zero items', () => {
  // check if the list is empty initially
  //   find the selector for the individual TODO items
  //   in the list
  //   use cy.get(...) and it should have length of 0
  cy.get('li.todo').should('have.length', 0)
  //   https://on.cypress.io/get
})

// remember to manually delete all items before running the test

it('adds two items', () => {
  // repeat twice
  //    get the input field
  cy.get('.new-todo')
    //    type text and "enter"
    .type('buy a horse {enter}')
  //    assert that the new Todo item
  cy.contains('li.todo', 'buy a horse').should('be.visible')
  //    has been added added to the list
  cy.get('.new-todo').type('swim some laps {enter}')
  cy.contains('li.todo', 'swim some laps').should('be.visible')
  // cy.get(...).should('have.length', 2)
  cy.get('.todo').should('have.length', 2)
})

it('can mark an item as completed', () => {
  // adds a few items
  cy.get('.new-todo').type('simple{enter}')
  cy.get('.new-todo').type('hard{enter}')
  // marks the first item as completed
  cy.contains('li.todo', 'simple')
    .should('exist')
    .find('.toggle')
    .check()
  // confirms the first item has the expected completed class
  cy.contains('li.todo', 'simple').should('have.class', 'completed')
  // confirms the other items are still incomplete
  cy.contains('li.todo', 'hard').should('not.have.class', 'completed')
})

it('can delete an item', () => {
  // adds a few items
  cy.get('.new-todo').type('delete me{enter}')
  cy.get('.new-todo').type('me too{enter}')
  // deletes the first item
  cy.contains('li.todo', 'delete me')
    .should('exist')
    .find('.destroy')
    // use force: true because we don't wsnt to hover
    .click({
      force: true
    })
  // confirm the deleted item is gone from the dom
  cy.contains('li.todo', 'delete me').should('not.exist')
  // confirm the other item still exists
  cy.contains('li.todo', 'me too').should('exist')
})

/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = text => {
  cy.get('.new-todo').type(`${text}{enter}`)
}

it('can add many items', () => {
  const num = 5
  for (let k = 0; k < num; k += 1) {
    // add an item
    addItem(`item: ${k + 1}`)
    // probably want to have a reusable function to add an item!
  }
  // check number of items
  cy.get('.todo').should('have.length', 10)
})

it('adds item with random text', () => {
  // use a helper function with Math.random()
  // or Cypress._.random() to generate unique text label
  const randomLabel = `Item ${Math.random()
    .toString()
    .slice(2, 14)}`
  // add such item
  addItem(randomLabel)
  cy.contains('li.todo', randomLabel)
    .should('be.visible')
    // and make sure it is visible and does not have class "completed"
    .and('not.have.class', 'completed')
})

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/