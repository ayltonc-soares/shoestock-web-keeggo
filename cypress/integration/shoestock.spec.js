/// <reference types="cypress" />

describe('Shoestock', () => {

    beforeEach(() => {
        cy.intercept(
            'GET',
            '**?nsCat=Natural&q=bolsa**'
        ).as('getSearchResults')


        cy.visit('https://www.shoestock.com.br/');
        cy.wait(3500);
    });

    before(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

    })

    it('Testando o campo de Busca', () => {
        cy.get('#search-input')
            .should('be.visible')
            .type('bolsa{enter}');
        cy.wait('@getSearchResults');
    })

    it('Adicionando ao carrinho de compras', () => {
        //Captura produto de exemplo
        cy.get('#smarthint-custom-box-from-search-1871 > .row > #content > .slick-it > .glider-track > .active > a > .item-card > .item-card__images > .item-card__images__image-link').click();
        
        //Escolhe o tamanho e pressiona o botao para comprar
        cy.wait(3500);
        cy.get(':nth-child(1) > .product-item').click();
        
        cy.wait(3500);
        cy.get('#buy-button-now').click();

        //Adiciona o elemento na sacola 
        cy.wait(3500);
        cy.get('.summary__actions > .btn--secondary').click();
    })


})