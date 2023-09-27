describe("page load", () => {
  it("displays board", () => {
    cy.visit("/");
    cy.contains("p", "ALL BOARDS").should("be.visible");
  });
});
