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
    it('size of each pieces is equal to or less than than a square', function() {
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