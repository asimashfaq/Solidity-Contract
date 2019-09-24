const Application = artifacts.require("../contracts/Application.sol");

contract("Application", function(accounts) {

  const testMessage = "ThisisSampleText";
  const tryCatch = require("./exceptions.ts").tryCatch;
  const errTypes = require("./exceptions.ts").errTypes;

  it("should have empty message", async () => {
    const contract = await Application.new();
    const message = await contract.getMessage();
    return assert.strictEqual(message, "", "Should have empty message");
  });

  it("should have same message", async () => {
    const contract = await Application.new();
    await contract.setMessage(testMessage);
    const message = await contract.getMessage();
    return assert.strictEqual(message, testMessage, "Should have same message");
  });

  it("should revert the transaction", async () => {
    const contract = await Application.new();
    const action  = contract.setMessage("");
    await tryCatch(action, errTypes.revert);

  });

});
