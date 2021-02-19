import {host} from "../support";

describe('sizes are correct', () => {
    beforeEach(() => {
        cy.visit(host)
    })
    it('boards are square', function () {
        cy.getBySel('component-board').should('be.visible')
            .then(elements => {
                for (let i = 0; i < elements.length; i++) {
                    const height = elements[i].getBoundingClientRect().height
                    const width = elements[i].getBoundingClientRect().width
                    expect(height).to.be.equal(width)
                }
            })
    })
    it('all squares are square', function () {
        cy.getBySel('board-square').should('be.visible')
            .then(elements => {
                for (let i = 0; i < elements.length; i++) {
                    const height = elements[i].getBoundingClientRect().height
                    const width = elements[i].getBoundingClientRect().width
                    expect(height).to.be.equal(width)
                }
            })
    })
    it('all squares are equal size', function () {
        cy.getBySel('board-square').should('be.visible')
            .then(elements => {
                const height = elements[0].getBoundingClientRect().height
                for (let i = 0; i < elements.length; i++) {
                    expect(elements[i].getBoundingClientRect().height).to.be.equal(height)
                }
            })
    })
    it('size of each piece is equal to or less than than a square', function() {
        cy.getBySel('board-square').should('be.visible')
            .then(elements => {
                const height = elements[0].getBoundingClientRect().height
                cy.getBySel('piece-img').should('be.visible')
                    .then(elements => {
                        for (let i = 0; i < elements.length; i++) {
                            expect(elements[i].getBoundingClientRect().height).to.be.at.most(height)
                            expect(elements[i].getBoundingClientRect().width).to.be.at.most(height)
                        }
                    })
            })
    })
})

describe('Add pieces', () => {
    const maximumPieces = {
        'pawn': 8
        }

    beforeEach(() => {
        cy.visit(host)
    })
    it('add pieces on click', function () {
        for (const piece in maximumPieces) {
            for (let i = 1; i <= maximumPieces[piece]; i++) {
                cy.getBySel('button-create-' + piece).should('be.visible')
                    .click()
                cy.getBySel('component-piece-' + piece + '-white').should('have.length', i)
            }
        }
    })
    it('added pieces do not exceed max', function () {
        for (const piece in maximumPieces) {
            for (let i = 1; i <= maximumPieces[piece]+1; i++) {
                cy.getBySel('button-create-' + piece).should('be.visible')
                    .click()
            }
            cy.getBySel('component-piece-' + piece + '-white').should('have.length', maximumPieces[piece])
        }
    })
    it('UI shows number of pieces created from buttons', function () {
        for (const piece in maximumPieces) {
            for (let i = 1; i <= maximumPieces[piece]; i++) {

                cy.getBySel('button-create-' + piece).should('be.visible')
                .click()
            cy.getBySel('piece-button-container').should('be.visible')
                .should('contain', String(i))
        }}
    })
})


