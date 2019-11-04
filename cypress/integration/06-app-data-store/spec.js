/// <reference types="cypress" />
// application should be running at port 3000
// and the "localhost:3000" is set as "baseUrl" in "cypress.json"
beforeEach(() => {
  cy.request('POST', '/reset', {
    todos: []
  })
})
beforeEach(() => {
  cy.visit('/')
})

beforeEach(function stubRandomId() {
  let count = 1
  cy.window().its('Math').then(Math => {
    cy
      .stub(Math, 'random', () => {
        return `0.${count++}`
      })
      .as('random') // save reference to the spy
  })
})

/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = text => {
  cy.get('.new-todo').type(`${text}{enter}`)
}

it('adds items to store', () => {
  // get application's window
  // then get app, $store, state, todos
  // it should have 2 items
  addItem('something')
  addItem('something else')
  cy.window().its('app.$store.state.todos').should('have.length', 2)
})

it('creates an item with id 1', () => {
  cy.server()
  cy.route('POST', '/todos').as('new-item')

  // TODO change Math.random to be deterministic

  // STEPS
  // get the application's "window" object using cy.window
  // then change its Math object and replace it
  // with your function that always returns "0.1"

  addItem('something')
  // confirm the item sent to the server has the right values
  cy.wait('@new-item').its('request.body').should('deep.equal', {
    id: '1',
    title: 'something',
    completed: false
  })
})

it('calls spy twice', () => {
  addItem('something')
  addItem('else')
  cy.get('@random').should('have.been.calledTwice')
})

it('puts the todo items into the data store', () => {
  // application uses data store to store its items
  // you can get the data store using "window.app.$store.state.todos"
  // add a couple of items
  // get the data store
  // check its contents
  addItem('something')
  addItem('else')
  cy
    .window()
    .its('app.$store.state.todos')
    .should('deep.equal', [{
        title: 'something',
        completed: false,
        id: '1'
      },
      {
        title: 'else',
        completed: false,
        id: '2'
      }
    ])
})