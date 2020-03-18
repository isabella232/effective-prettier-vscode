import * as assert from "assert";

import * as sinon from "sinon";

import { MessageItem, MessageOptions, window } from "vscode";
import {
  LEGACY_VSCODE_LINTER_CONFIG_MESSAGE,
  OUTDATED_PRETTIER_VERSION_MESSAGE
} from "../../message";
import { format } from "./format.test";

suite("Test notifications", function() {
  let showWarningMessage: sinon.SinonStub<
    [string, MessageOptions, ...MessageItem[]],
    Thenable<MessageItem | undefined>
  >;
  let showErrorMessage: sinon.SinonStub<
    [string, MessageOptions, ...MessageItem[]],
    Thenable<MessageItem | undefined>
  >;
  this.timeout(10000);
  this.beforeEach(() => {
    showWarningMessage = sinon.stub(window, "showWarningMessage");
    showErrorMessage = sinon.stub(window, "showErrorMessage");
  });
  this.afterEach(() => {
    showWarningMessage.restore();
    showErrorMessage.restore();
  });
  test("shows error for outdated prettier instance", async () => {
    await format("outdated", "ugly.js");
    assert(showErrorMessage.calledWith(OUTDATED_PRETTIER_VERSION_MESSAGE));
  });
  test("shows error for legacy vscode config", async () => {
    await format("outdated", "ugly.js");
    assert(showWarningMessage.calledWith(LEGACY_VSCODE_LINTER_CONFIG_MESSAGE));
  });
  test("does not show error with valid project", async () => {
    await format("plugins", "index.php");
    assert(showWarningMessage.notCalled);
  });
});
