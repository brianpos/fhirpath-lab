import {OutputChannel, ProgressLocation, window} from 'vscode';

export function logData(data: string, logger: OutputChannel): void {
  const timestamp = new Date().toLocaleString("fr-FR");
  logger.appendLine(`${timestamp} : ${data}`);
}

export function executeWithProgress<T>(message: string, task: () => Promise<T>): Promise<T> {
  return Promise.resolve(window.withProgress(
      {
        location: ProgressLocation.Notification,
        cancellable: false,
      },
      (progress) => {
        progress.report({message});
        return task();
      }
  ));
}

export function isEmptyOrBlank(str: string): boolean {
  return !str || str.trim() === '';
}
