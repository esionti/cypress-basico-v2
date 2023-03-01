// CAC-TAT.spec.jsf.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
     })

    it('verifica o título da aplicação', function() {    
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('filho')
        cy.get('#email').type('Walmy@exemplo.com')
        
    //  cy.get('#open-text-area').type('teste')
        cy.get('#open-text-area').type(longtext, {delay: 0}) // delay ajudar o preenchimento de texto longo ser mais rápido

    //  cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('filho')
        cy.get('#email').type('Walmy@exemplo,com')        
        cy.get('#open-text-area').type('teste')

    //  cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido  com valor não-numerico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('filho')
        cy.get('#email').type('Walmy@exemplo.com')
        cy.get('#phone-checkbox').check()        
        cy.get('#open-text-area').type('teste')   
        
    //  cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Walmyr')
            .should('have.value', 'Walmyr')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('filho')
            .should('have.value', 'filho')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('Walmy@exemplo.com')
            .should('have.value', 'Walmy@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    //  cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()           //chamada de um comando na pasta commands.js
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)                   //valida a qtd de retorno de seleção
            .each(function($radio) {                    //agrupa cada seleção
                cy.wrap($radio).check()                 //check todas as opções por vez
                cy.wrap($radio).should('be.checked')    //valida se todos foram selecionadas por vez
            })
        })

        it('marca ambos checkboxes, depois desmarca o último', function(){
            cy.get('input[type="checkbox"]')    //mapeado o pai
                .check()                        //check todos
                .should('be.checked')
                .last()                         //localiza o ultimo
                .uncheck()                      //tira o check
                .should('not.be.checked')
        })

        it('seleciona um arquivo da pasta fixtures', function() {
            cy.get('input[type="file"]')
              .should('not.be.value')
              .selectFile('./cypress/fixtures/example.json')
              .should(function($input){
                //console.log($input)   //debug - comando para debugar
                expect($input[0].files[0].name).to.equal('example.json')
              })
        })

        it('seleciona um arquivo simulando um drag-and-drop', function() {
            cy.get('input[type="file"]')
              .should('not.be.value')
              .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) 
              .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
              })
        })

        it('seleciona um arquivo simulando um drag-and-drop', function() {
            cy.fixture('example.json').as('samplefile')     //valor do caminho da fixture ao invés de mapear todo o caminho
            cy.get('input[type="file"]')
              .should('not.be.value')
              .selectFile('@samplefile') 
              .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
              })
        })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
           cy.get('#privacy a').should('have.attr', 'target', '_blank') //valida se há atributo (attr), example: <a href="privacy.html" target="_blank">Política de Privacidade</a>
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
            cy.get('#privacy a')
            .invoke('removeAttr', 'target')             //remevo o atributo target para abrir na mesma aba ao invés de abrir em outra aba.
            .click()
            cy.contains('Talking About Testing').should('be.visible')
        })

    })
