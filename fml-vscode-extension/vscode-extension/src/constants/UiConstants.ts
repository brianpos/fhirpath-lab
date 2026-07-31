import * as vscode from 'vscode';

export class UiConstants {
    public static readonly extensionPublisher = 'fhirpath-lab.fml-tools';
    public static readonly principalChannelTitle = "FHIR Mapping Language Tools";
    public static readonly detailsChannelTitle = "FHIR Mapping Language Tools Workspace";
    public static readonly principalChannel = vscode.window.createOutputChannel(UiConstants.principalChannelTitle);
    public static readonly detailsChannel = vscode.window.createOutputChannel(UiConstants.detailsChannelTitle);
    public static readonly fmlFilesPathToWatch = '**/*.fml';
    public static readonly qaPathToWatch = '**/output/qa.json';
}
