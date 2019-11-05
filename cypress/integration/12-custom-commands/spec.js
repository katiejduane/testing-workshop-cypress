/// <reference types="cypress" />
// <reference path="./custom-commands.d.ts" />
/// <reference path="../../support/commands.js" /> 
// ABOVE lets cypress autocomplete WITH your custom commands, too

import {
  resetData,
  visitSite
} from '../../support/hooks'

// import { }

beforeEach(resetData)
beforeEach(visitSite)

it('enters 10 todos', function () {
  cy.get('.new-todo')
    .type('todo 0{enter}')
    .type('todo 1{enter}')
    .type('todo 2{enter}')
    .type('todo 3{enter}')
    .type('todo 4{enter}')
    .type('todo 5{enter}')
    .type('todo 6{enter}')
    .type('todo 7{enter}')
    .type('todo 8{enter}')
    .type('todo 9{enter}')
  cy.get('.todo').should('have.length', 10)
})

it('uses an xpath to find list items', () => {
  cy.get('.new-todo')
    .type('todo 0{enter}')
    .type('todo 1{enter}')
    .type('todo 2{enter}')
  cy.xpath('//ul[@class="todo-list"]//li')
    .should('have.length', 3)
})

// the function below uses a custom command written in the commands.js file located in 'support' directory
// NO NEED TO IMPORT. cypress knows its there becuase of index.js, which is loaded before each test,
// and index.js imports the commands
it('can use a custom command located in the commands.js file', () => {
  cy.addTodo('dream on')
})

// simple custom command
Cypress.Commands.add('createTodo', todo => {
  cy.get('.new-todo').type(`${todo}{enter}`)
})

// with better command log
Cypress.Commands.add('createTodo', todo => {
  cy.get('.new-todo', {
    log: false
  }).type(`${todo}{enter}`, {
    log: false
  })
  cy.log('createTodo', todo)
})

// with full command log
Cypress.Commands.add('createTodo', todo => {
  const cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps() {
      return {
        'Create Todo': todo
      }
    }
  })

  cy.get('.new-todo', {
      log: false
    })
    .type(`${todo}{enter}`, {
      log: false
    })
    .then($el => {
      cmd
        .set({
          $el
        })
        .snapshot()
        .end()
    })
})

it('creates a todo', () => {
  cy.createTodo('my first todo')
})

// it.skip('passes when object gets new property', ...) .skip() SKIPS the test
// it.only('passes when object gets new property', ...) .only runs ONLY this test and skips all the others

it('passes when object gets new property', () => {
  const o = {}
  setTimeout(() => {
    o.foo = 'bar'
  }, 1000)
  const get = name =>
    function getProp(from) {
      console.log('getting', from)
      return from[name]
    }

  cy.wrap(o)
    .pipe(get('foo'))
    .should('not.be.undefined')
    .and('equal', 'bar')
})

it('creates todos and then uses cy.window', () => {
  cy.get('.new-todo')
    .type('todo 0{enter}')
    .type('todo 1{enter}')
    .type('todo 2{enter}')
  cy.get('.todo').should('have.length', 3)
  cy.window()
    .its('app.todos')
    .toMatchSnapshot()
})