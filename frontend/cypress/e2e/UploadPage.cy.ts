/// <reference types="Cypress" />

describe('Upload Page', () => {
  it('successfully uploads a file', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/upload',
      },{
        "name": "file.csv",
        "extension": "csv"
    }
    ).as('UploadFile')

    cy.visit('localhost:8888');
    
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('fake csv'),
      fileName: 'file.csv'
    });

    cy.contains('Upload the file').click();
    cy.contains('Upload is completed').should('be.visible');
  });
  
  it('unsuccessfully uploads a file', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/upload',
      },
      {statusCode: 500}
    ).as('UploadFile')

    cy.visit('localhost:8888');
    
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('fake csv'),
      fileName: 'file.csv'
    });

    cy.contains('Upload the file').click();
    cy.contains('Failed to upload the file. Please try again later.').should('be.visible');
  });
})