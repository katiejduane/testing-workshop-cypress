/// <reference types="cypress" />

import {
  selectors,
  tid
} from './common-selectors'
// above is similat to how we have been using page objects, but here it's a single helper function and
// an exported object containing selectors for elements. this is NOT 'real' page object creation, as that
// requires class instantiation and associated methods calls

beforeEach(() => {
  // application should be running at port 3000
  // and the "localhost:3000" is set as "baseUrl" in "cypress.json"
  cy.visit('/')
})
it('loads', () => {
  cy.contains('h1', 'todos')
})
// optional test data attribute selector helper
// const tid = id => `[data-cy="${id}"]`

/**
 * Adds a todo item
 * @param {string} text
 */

const addItem = text => {
  cy.get('[data-cy="input"]').type(`${text}{enter}`)
}

it('adds two items', () => {
  addItem('first item')
  addItem('second item')
  cy.get(tid('item')).should('have.length', 2)
})

// below uses something akin to page objects how we have been using them (but without class instantiation 
// or method calls just very simple object export)
it('finds element', () => {
  cy.get(selectors.todoInput).type('something{enter}')

  // "tid" forms "data-test-id" attribute selector
  // like "[data-test-id='item']"
  cy.get(tid('item')).should('have.length', 3)
})