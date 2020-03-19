import { commands, ExtensionContext } from "vscode";
import TelemetryReporter from "vscode-extension-telemetry";
import { ConfigResolver } from "./ConfigResolver";
import { IgnorerResolver } from "./IgnorerResolver";
import { LanguageResolver } from "./LanguageResolver";
import { LoggingService } from "./LoggingService";
import { ModuleResolver } from "./ModuleResolver";
import { NotificationService } from "./NotificationService";
import PrettierEditService from "./PrettierEditService";
import { StatusBarService } from "./StatusBarService";

// the application insights key (also known as instrumentation key)
const telemetryKey = "93c48152-e880-42c1-8652-30ad62ce8b49";
const extensionName =
  process.env.EXTENSION_NAME || "sebastian-software.effective-prettier-vscode";
const extensionVersion = process.env.EXTENSION_VERSION || "0.0.0";

// telemetry reporter
let reporter: TelemetryReporter;

export function activate(context: ExtensionContext) {
  const hrStart = process.hrtime();

  const loggingService = new LoggingService();

  loggingService.logInfo(`Extension Name: ${extensionName}.`);
  loggingService.logInfo(`Extension Version: ${extensionVersion}.`);

  // create telemetry reporter on extension activation
  reporter = new TelemetryReporter(
    extensionName,
    extensionVersion,
    telemetryKey
  );

  const openOutputCommand = commands.registerCommand(
    "prettier.openOutput",
    () => {
      loggingService.show();
    }
  );

  const ignoreResolver = new IgnorerResolver(loggingService);
  const configResolver = new ConfigResolver(loggingService);
  const notificationService = new NotificationService(reporter, loggingService);

  const moduleResolver = new ModuleResolver(
    loggingService,
    notificationService
  );

  const languageResolver = new LanguageResolver(moduleResolver);

  const statusBarService = new StatusBarService(
    languageResolver,
    loggingService
  );

  const editService = new PrettierEditService(
    moduleResolver,
    languageResolver,
    ignoreResolver,
    configResolver,
    loggingService,
    notificationService,
    statusBarService
  );
  editService.registerFormatter();

  context.subscriptions.push(
    editService,
    reporter,
    openOutputCommand,
    ...editService.registerDisposables(),
    ...statusBarService.registerDisposables()
  );

  const hrEnd = process.hrtime(hrStart);
  reporter.sendTelemetryEvent("extensionActivated", undefined, {
    activationTime: hrEnd[1] / 1000000
  });
}

export function deactivate() {
  // This will ensure all pending events get flushed
  reporter.dispose();
}
