import { getHeader } from '../support/app.po';

describe('cisa-visualizer-client-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getHeader().contains(/Cisa Visualizer/);
  });
});
