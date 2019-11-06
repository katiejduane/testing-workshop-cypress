/// <reference types="cypress" />
// type definition for out TodoModel
/// <reference path='./model.d.ts' />
// @ts-check
import {
    addDefaultTodos,
    addTodos,
    allItems,
    TODO_ITEM_ONE,
    TODO_ITEM_THREE,
    TODO_ITEM_TWO,
    toggle,
    destroy
} from './utils'

describe('TodoMVC', function () {
    beforeEach(function () {
        cy.visit('/')
    })

    context('When page is initially opened', function () {
        it('should focus on the todo input field', function () {
            cy.focused().should('have.class', 'new-todo')
        })
    })

    context('No Todos', function () {
        it('should hide #main and #footer', function () {
            allItems().should('not.exist')
            cy.get('.main').should('not.exist')
            cy.get('.footer').should('not.exist')
        })
    })

    context('New Todo', function () {
        const NEW_TODO = '.new-todo'

        it('should allow me to add todo items', function () {
            cy.get(NEW_TODO)
                .type(TODO_ITEM_ONE)
                .type('{enter}')
            allItems()
                .eq(0)
                .find('label')
                .should('contain', TODO_ITEM_ONE)
            cy.get(NEW_TODO)
                .type(TODO_ITEM_TWO)
                .type('{enter}')
            allItems()
                .eq(1)
                .find('label')
                .should('contain', TODO_ITEM_TWO)
        })
    })

    context('Toggling items', function () {

        const CLEAR_COMPLETED = '.clear-completed'

        beforeEach(addDefaultTodos)

        it('should display the correct text', function () {
            toggle(0)
            cy.get(CLEAR_COMPLETED).contains('Clear completed')
        })

        it('should remove completed items when clicked', function () {
            toggle(1)
            cy.get(CLEAR_COMPLETED).click()
            allItems().should('have.length', 2)
            allItems()
                .eq(0)
                .should('contain', TODO_ITEM_ONE)
            allItems()
                .eq(1)
                .should('contain', TODO_ITEM_THREE)
        })

        it('should be hidden when there are no items that are completed', function () {
            toggle(1)
            cy.get(CLEAR_COMPLETED)
                .should('be.visible')
                .click()
            cy.get(CLEAR_COMPLETED).should('not.exist')
        })
    })

    context('Deleting items', function () {

        const CHERRY_PIE = 'cherry pie'
        const BANANA_SPLIT = 'banana split'
        const COCONUT_CAKE = 'coconut cake'

        it('should not show items or footer when todos are deleted', function () {
            const desserts = [CHERRY_PIE, BANANA_SPLIT, COCONUT_CAKE]
            addTodos(CHERRY_PIE, BANANA_SPLIT, COCONUT_CAKE)
            allItems()
                .eq(0)
                .find('label')
                .should('contain', CHERRY_PIE)
            desserts.forEach(function () {
                destroy(0)
            })
            allItems().should('not.exist')
            cy.get('.main').should('not.exist')
            cy.get('.footer').should('not.exist')
        })
    })
})