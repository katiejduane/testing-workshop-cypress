/// <reference types="cypress" />
it('sets list of todos on the server', () => {
  // load fixture "two-items.json" from the fixtures folder
  cy.fixture('two-items').then(list => {
    // then use it to make POST request to the "/reset" endpoint
    // just like we did to reset the server state
    cy.request('POST', '/reset', {
      todos: list
    })
    // bonus: check that the list has 2 items
    cy.request('GET', '/todos').should((res) => {
      expect(res.body).to.have.length(2)
    })
  })
})

context('closure variable', () => {
  // store loaded list in this closure variable
  let list

  beforeEach(() => {
    cy.fixture('two-items').then(l => {
      list = l
    })
    // then store the loaded items in variable "list"
  })

  it('has two items', () => {
    if (list) {
      expect(list).to.have.length(2)
    }
  })

  it('sets list from context', () => {
    // post items to the server
    expect(list).to.have.length(2)
    cy.request('POST', '/reset', {
      todos: list
    })
  })
})

//⌨️ test context "this.list"

//Try saving time by replacing beforeEach with before.

// What happens? How do you solve this?

// Note: Each test wipes away the previous context object. Thus "this.list" becomes undefined when the second 
// test runs. You can use closure variable instead of "this" to get around this. This is a common problem when 
// trying to save time on login.

context('this.list', () => {
  // it is important to use "function () {}"
  // as a callback to "beforeEach", so we have
  // "this" pointing at the test context
  beforeEach(function () {
    cy.fixture('two-items').then(list => {
      // inner callback can be a function or an arrow expression
      this.list = list
    })
  })

  // again, it is important to use "function () {}" callback
  // to make sure "this" points at the test context
  it('sets list from context', function () {
    // POST the items to the server using "/reset"
    cy.request('POST', '/reset', {
      todos: this.list
    })
  })

  it('has valid list with 2 items', function () {
    // check that "this.list" has 2 items
    expect(this.list).to.have.length(2)
  })
})

context('@list', () => {
  // again, it is important to use "function () {}"
  // as a callback to "beforeEach" to set the right "this"
  beforeEach(function () {
    // use shortcut "as('list')" will save the value into "this.list"
    // cy.fixture(<filename>).as(<alias name>)
    cy.fixture('two-items').as('list')
  })

  // again, it is important to use "function () {}" callback
  // to make sure "this" points at the test context
  it('sets list from context', function () {
    // use "this.list" like before to send the list to the server
    expect(this.list).to.have.length(2)
    cy.request('POST', '/reset', {
      todos: this.list
    })
  })
})

// show that immediately using "this.list" does not work
it.skip('does not work', function () {
  // load fixture and set it as "list"
  // then try checking "this.list" immediately
  cy.fixture('two-items').as('list')
  // we are using "this.list" BEFORE it was set in
  // the above asynchronous call
  expect(this.list).to.have.length(2)
  cy.request('POST', '/reset', {
    todos: this.list
  })
})

it('works if we change the order', function () {
  cy.fixture('two-items')
    .as('list')
    .then(() => {
      // by now the fixture has been saved into "this.list"
      // check that "this.list" has 2 items
      // use it to post to the server
      expect(this.list).to.have.length(2)
      cy.request('POST', '/reset', {
        todos: this.list
      })
    })
})

context('reading todos.json', () => {
  it('loads empty list', () => {
    cy.request('POST', '/reset', {
      todos: []
    })
    cy.readFile('todomvc/data.json', 'utf8').should('deep.equal', {
      todos: []
    })
  })

  it('reads items loaded from fixture', () => {
    cy.fixture('two-items').then(todos => {
      cy.request('POST', '/reset', {
        todos
      })
      cy.readFile('todomvc/data.json').should('deep.equal', {
        todos
      })
    })
  })

  it('saves todo', () => {
    cy.request('POST', '/reset', {
      todos: []
    })
    cy.visit('/')
    cy.get('.new-todo').type('for test{enter}')
    cy.readFile('todomvc/data.json').should(data => {
      expect(data.todos).to.have.length(1)
      expect(data.todos[0].title).to.equal('for test')
    })
  })
})

it('saves todo', () => {
  // reset data on the server
  // visit the page
  // type new todo via GUI
  // read file - it should have the item you have entered
  // hint: to demonstrate retries,
  // write should(cb) assertion
  // and add a delay to the application
  cy.request('POST', '/reset', {
    todos: []
  })
  cy.visit('/')
  cy.get('.new-todo').type('for test{enter}')
  cy.readFile('todomvc/data.json').should(data => {
    expect(data.todos).to.have.length(1)
    expect(data.todos[0].title).to.equal('for test')
  })
})

// context('app actions with fixtures', () => {
//   beforeEach(() => {
//     // load fixture two-items
//     // visit the page, make sure it has been loaded
//   })

//   it('invokes app action to set data from fixture', function () {
//     // grab window app.$store
//     // and for each item from the fixture
//     // dispatch action "addEntireTodo"
//     cy.window().its('app.$store')
//     // create items by dispatching actions
//   })
// })