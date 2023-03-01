Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('filho')
    cy.get('#email').type('Walmy@exemplo.com')        
    cy.get('#open-text-area').type('teste')   
//  cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
})
