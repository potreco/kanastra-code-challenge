/// <reference types="Cypress" />

describe('Upload Page', () => {
  it('successfully uploads a file and list the uploaded file', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/upload',
      },{
        "name": "file.csv",
        "extension": "csv"
    }
    ).as('UploadFile')
    
    cy.intercept(
      {
        method: 'GET',
        url: '/api/files',
      },
      [{
        "name": "file.csv",
        "extension": "csv"
      }]
    ).as('ListFile')

    cy.visit('localhost:8888');
    
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('fake csv'),
      fileName: 'file.csv'
    });

    cy.contains('Upload the file').click();
    cy.contains('Upload is completed').should('be.visible');
    cy.contains('Go to File List').click();
    cy.get('li').contains('file.csv').should('be.visible');
  });
  
  it('unsuccessfully uploads a file and the list is empty', () => {cy.intercept(
    {
      method: 'POST',
      url: '/api/upload',
    },
    {
      statusCode: 500
    }
  ).as('UploadFile')
  
  cy.intercept(
    {
      method: 'GET',
      url: '/api/files',
    },
    []
  ).as('ListFile')

  cy.visit('localhost:8888');
  
  cy.get('input[type="file"]').selectFile({
    contents: Cypress.Buffer.from('fake csv'),
    fileName: 'file.csv'
  });

  cy.contains('Upload the file').click();
  cy.contains('Failed to upload the file. Please try again later.').should('be.visible');

  cy.contains('Go to File List').click();
  cy.get('li').should('not.exist');
  });
})