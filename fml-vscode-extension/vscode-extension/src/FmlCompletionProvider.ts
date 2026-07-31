import {
  CompletionItemProvider,
  TextDocument,
  Position,
  ProviderResult,
  CompletionItem,
  CompletionList,
  workspace,
  FileSystemWatcher,
  Uri,
  OutputChannel,
} from 'vscode';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import {
  UserDefinition
} from './Models';
import { 
  collectFilesWithExtension,
  retrieveAllLines,
  retrieveLines,
  retrieveSourceAndTargetFromGroupLine,
  retrieveNameAndAlias,
  retrieveUrlAliasAs,
  retrieveType,
  getAllParamsFromUrl
} from './utils';
import { FhirDefinition } from './FhirDefinition';


export class FmlCompletionProvider implements CompletionItemProvider {
  fhirVersion: string = '';
  fmlWatcher!: FileSystemWatcher;
  packageWatcher! : FileSystemWatcher;
  latestHashes: Map<string, string> = new Map();
  userDefinitions : Map<string, UserDefinition[]> = new Map();
  logger : OutputChannel;

  constructor(private definitionProvider: FhirDefinition, private outputChannel : OutputChannel) {
    this.logger = outputChannel;
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start FmlCompletionProvider`);
    if (workspace && workspace.workspaceFolders) {
      this.scanAll();
      this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Create file watcher for .fml`);
      this.fmlWatcher = workspace.createFileSystemWatcher('**/*');
      this.fmlWatcher.onDidCreate(this.updateFmlDefintion, this);
      this.fmlWatcher.onDidChange(this.updateFmlDefintion, this);
      this.fmlWatcher.onDidDelete(this.handleDeletedFile, this);
    }
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End FmlCompletionProvider`);
  }

  public async scanAll(): Promise<void> {
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start scanAll`);
    await this.definitionProvider.updateFhirEntities();
    // clear all maps from previous informations
    this.userDefinitions.clear();
    this.latestHashes.clear();

    // get all our fml files
    const fmlFiles: string[] = [];
    workspace.workspaceFolders!.forEach(folder => {
      const folderPath = folder.uri.fsPath;
      this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start collectFilesFromPath for ${folderPath}`);
      collectFilesWithExtension(folderPath, fmlFiles, '.fml');
      this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End collectFilesFromPath for ${folderPath}`);
    });

    fmlFiles.forEach(fmlFile => {
      this.userDefinitions.set(fmlFile, []);
      const fileText = fs.readFileSync(fmlFile).toString();    
      const allLines = retrieveAllLines(this.logger, fmlFile);
      const lines = retrieveLines(this.logger, allLines, 'uses');
      if (lines.length > 0) {
        lines.forEach(line => {
          const [urlLine, aliasLine, asLine] = retrieveUrlAliasAs(this.logger, line);
          const typeLine = retrieveType(this.logger, urlLine);
          const userDef : UserDefinition = {
            url : urlLine,
            alias : aliasLine === '' ? typeLine : aliasLine,
            as : asLine,
            type : typeLine
          };
          this.userDefinitions.get(fmlFile)?.push(userDef);
        });
      }

      const groupLine = retrieveLines(this.logger, allLines, 'group');
      if(groupLine.length > 0) {
        // Hope for only one group definition per file
        const returnLines = retrieveSourceAndTargetFromGroupLine(this.logger, groupLine[0]);
        returnLines.forEach(line => {
          const [name, alias, element] = retrieveNameAndAlias(this.logger, line);
          const objToUpdate = this.userDefinitions.get(fmlFile)?.find(obj => obj.as === element && obj.alias === alias);
          if (objToUpdate) {
            objToUpdate.name = name;
          }
        });
      }
      
      const hash = crypto.createHash('sha256');
      hash.update(fileText);
      const newHash = hash.digest().toString();
      this.latestHashes.set(fmlFile, newHash);
    });
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End scanAll`);
  }
 
  public provideCompletionItems(
    document: TextDocument,
    position: Position
  ): ProviderResult<CompletionItem[] | CompletionList> {
    let sourceName : string = '';
    let targetName : string = '';
    const linePrefix = document.lineAt(position).text.substring(0, position.character);
    const userDef = this.userDefinitions.get(document.fileName);

    if(userDef){
      sourceName = userDef.find(elem => elem.as === 'source' && elem.name !== '')?.name ?? '';
      targetName = userDef.find(elem => elem.as === 'target' && elem.name !== '')?.name ?? '';
    }

    if (sourceName && linePrefix.endsWith(`${sourceName}.`)) {
      return getAllParamsFromUrl(
        this.logger,
        userDef?.find(elem => elem.name === sourceName)?.url ?? '',
        this.definitionProvider
      );
    }
    if (targetName && linePrefix.endsWith(`${targetName}.`)) {
      return getAllParamsFromUrl(
        this.logger,
        userDef?.find(elem => elem.name === targetName)?.url ?? '',
        this.definitionProvider
      );
    }

    return [];
  }

  public updateFmlDefintion(filepath: string | Uri, file?: TextDocument) {
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start updateFmlDefintion`);
    if (file) {
      filepath = file.uri.fsPath;
    } else if (filepath instanceof Uri) {
      filepath = filepath.fsPath;
    }

    // get fml files from path
    const fmlFiles: string[] = [];
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start collectFilesFromPath for ${filepath}`);
    collectFilesWithExtension(filepath, fmlFiles, '.fml');
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start collectFilesFromPath for ${filepath}`);

    fmlFiles.forEach(fmlFile => {
      const fileText = file ? file.getText() : fs.readFileSync(fmlFile).toString();
      const hash = crypto.createHash('sha256');
      hash.update(fileText);
      const newHash = hash.digest().toString();

      if (this.latestHashes.get(fmlFile) !== newHash) {
        if (this.userDefinitions.has(fmlFile)) {
          this.userDefinitions.delete(fmlFile);
        }

        this.userDefinitions.set(fmlFile, []);
        const allLines = retrieveAllLines(this.logger, fmlFile);
        const lines = retrieveLines(this.logger, allLines, 'uses');
        if (lines.length > 0) {
          lines.forEach(line => {
            const [urlLine, aliasLine, asLine] = retrieveUrlAliasAs(this.logger, line);
            const typeLine = retrieveType(this.logger, urlLine);
            const userDef : UserDefinition = {
              url : urlLine,
              alias : aliasLine === '' ? typeLine : aliasLine,
              as : asLine,
              type : typeLine
            };
            this.userDefinitions.get(fmlFile)?.push(userDef);
          });
        }

        const groupLine = retrieveLines(this.logger, allLines, 'group');
        if(groupLine.length > 0) {
          // Hope for only one group definition per file
          const returnLines = retrieveSourceAndTargetFromGroupLine(this.logger, groupLine[0]);
          returnLines.forEach(line => {
            const [name, alias, element] = retrieveNameAndAlias(this.logger, line);
            const objToUpdate = this.userDefinitions.get(fmlFile)?.find(obj => obj.as === element && obj.alias === alias);
            if (objToUpdate) {
              objToUpdate.name = name;
            }
          });
        }
      this.latestHashes.set(fmlFile, newHash);
      }
    });
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End updateFmlDefintion`);
  }

  public handleDeletedFile(filepath: string | Uri): void {
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start handleDeletedFile`);
    if (filepath instanceof Uri) {
      filepath = filepath.fsPath;
    }

    Array.from(this.userDefinitions.keys()).forEach(knownFile => {
      if (knownFile === filepath || knownFile.startsWith(`${filepath}${path.sep}`)) {
        // remove this file from the userDefinitions and latestHashes maps
        this.userDefinitions.delete(knownFile);
        this.latestHashes.delete(knownFile);
      }
    });
    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End handleDeletedFile`);
  }

}
