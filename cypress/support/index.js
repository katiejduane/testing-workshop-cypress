// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// optionally, load Cypress Halloween color theme
// https://www.cypress.io/blog/2018/10/11/halloween-theme/
// require('cypress-dark/src/halloween')

// Require third party modules/custom commands:
require('cypress-xpath')
require('cypress-pipe')
require('cypress-plugin-snapshots/commands')
require('cypress-failed-log')

// load commands for code coverage
// require('@cypress/code-coverage/support')

// this globally requires these two functions run before each test (not test file, test)
// so probably NOT A GOOD IDEA FOR TESTS THAT ARE SPECIFIC, like these (LOGIN would be good tho)
// beforeEach(function resetData() {
//     cy.request('POST', '/reset', {
//         todos: []
//     })
// })

// beforeEach(function visitSite() {
//     cy.visit('/')
// })