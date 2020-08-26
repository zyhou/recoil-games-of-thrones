describe("Characters Page", () => {
  it("should display the first character", () => {
    cy.visit("/");

    cy.findByRole("heading", { name: /Eddard Star/i }).should("be.visible");
    cy.findByText(/Sean Bean/i).should("be.visible");
    cy.findByText(/House Stark/i).should("be.visible");
    cy.findByText(/Dead/i).should("be.visible");
    cy.findByAltText(/eddard stark/i).should("be.visible");
  });

  it("should display next character when user click on next button", () => {
    cy.visit("/");

    cy.findByRole("heading", { name: /Eddard Star/i }).should("be.visible");

    cy.findByRole("button").click();

    cy.findByRole("heading", { name: /Sansa Stark/i }).should("be.visible");
    cy.findByText(/Sophie Turner/i).should("be.visible");
    cy.findByText(/House Stark/i).should("be.visible");
    cy.findByText(/Alive/i).should("be.visible");
    cy.findByAltText(/sansa stark/i).should("be.visible");
  });

  it("should display first character when user click twice on next button", () => {
    cy.visit("/");

    cy.findByRole("heading", { name: /Eddard Star/i }).should("be.visible");
    cy.findByRole("button").click();

    cy.findByRole("heading", { name: /Sansa Stark/i }).should("be.visible");
    cy.findByRole("button").click();

    cy.findByRole("heading", { name: /Eddard Star/i }).should("be.visible");
  });
});
