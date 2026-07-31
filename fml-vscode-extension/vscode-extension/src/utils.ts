import {CompletionItem, OutputChannel, ProgressLocation, window} from 'vscode';
import fs from 'fs';
import path from 'path';
import os from 'os';
import axios from 'axios';
import * as zlib from 'zlib';
import * as tar from 'tar';
import {FhirDefinition} from './FhirDefinition';
import {ElementInfo} from './Models';


export function downloadFHIRPackage(logger: OutputChannel, registries: string[], packageName: string, version: string): boolean {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start downloadFHIRPackage for ${packageName}#${version}`);
  let download = false;

  registries.forEach(url => {
    try {
      if (!download) {
        axios.get(`${url}/${packageName}/${version}`, {responseType: 'arraybuffer'}).then(
            result => {
              if (result.status === 200) {
                const filePath = path.join(os.homedir(), '.fhir', `${packageName}-${version}.tgz`);
                fs.writeFileSync(filePath, result.data);
                console.log(`Package downloaded successfully: ${filePath}`);
                logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End downloadFHIRPackage`);
                download = true;
              }
            },
            error => {
              logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Error downloading package ${packageName}#${version} from ${url}`);
            });
      }
    } catch (er) {
      logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Error downloading package ${packageName}#${version} : ${er}`);
      console.error(`Error downloading package ${packageName}#${version} : ${er}`);
    }
  });
  return download;
}

export async function extractTGZ(logger: OutputChannel, filePath: string, outputDir: string): Promise<void> {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start extractTGZ for ${filePath}`);
  return new Promise((resolve, reject) => {
    // Ensure the output directory exists
    fs.mkdirSync(outputDir, {recursive: true});

    // Create a read stream for the .tgz file
    const fileStream = fs.createReadStream(filePath);

    // Pipe the stream through zlib to decompress and tar to extract
    fileStream
        .pipe(zlib.createGunzip())
        .pipe(tar.extract({cwd: outputDir}))
        .on('finish', () => {
          console.log('Extraction complete');
          logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Extraction complete`);
          fs.unlinkSync(filePath);
          logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End extractTGZ for ${filePath}`);
          resolve();
        })
        .on('error', (error: any) => {
          console.error('Error during extraction:', error);
          logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Error during extraction of ${filePath} : ${error}`);
          reject(error);
        });
  });
}

export function collectFilesWithExtension(filepath: string,
                                          files: string[],
                                          extension: string): void {

  const stats = fs.statSync(filepath);

  if (stats.isDirectory()) {
    const entries = fs.readdirSync(filepath);
    for (const entry of entries) {
      const fullPath = path.join(filepath, entry);
      collectFilesWithExtension(fullPath, files, extension);
    }
  } else if (filepath.endsWith(extension)) {
    files.push(filepath);
  }
}

export function retrieveAllLines(logger: OutputChannel, fmlFile: string): string[] {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start eretrieveAllLines`);

  try {
    // Lire tout le contenu du fichier de manière synchrone
    const fileContent: string = fs.readFileSync(fmlFile, 'utf-8');

    // Diviser le contenu en lignes
    const lines: string[] = fileContent.split(/\r?\n/);
    logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End retrieveAllLines`);

    return lines;
  } catch (error) {
    console.error('Error reading file :', error);
    logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Error reading file ${error}`);
    return [];
  }
}

export function retrieveLines(logger: OutputChannel, lines: string[], startString: string): string[] {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start retrieveLines`);
  const returnLines: string[] = [];
  lines.forEach((line) => {
    if (line.startsWith(startString)) {
      returnLines.push(line);
    }
  });
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End retrieveLines`);
  return returnLines;
}

export function retrieveSourceAndTargetFromGroupLine(logger: OutputChannel, groupLine: string): string[] {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start retrieveSourceAndTargetFromGroupLine`);
  const regex = /\((.*?)\)/;
  const match = groupLine.match(regex);
  let parenthesisString = '';
  let splitParenthesisString: any[];
  const returnLines: string[] = [];

  if (match && match[1]) {
    parenthesisString = match[1];
  }

  splitParenthesisString = parenthesisString.split(',');

  splitParenthesisString.forEach((line) => {
    returnLines.push(line);
  });

  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End retrieveSourceAndTargetFromGroupLine`);
  return returnLines;
}

export function retrieveNameAndAlias(logger: OutputChannel, line: string): [string, string, string] {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start retrieveNameAndAlias`);
  let splitSrcLine: any[];
  let element: string;
  if (line.startsWith('source')) {
    element = 'source';
    splitSrcLine = (line.replace('source ', '')).split(":");
  } else {
    element = 'target';
    splitSrcLine = (line.replace('target ', '')).split(":");
  }
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End retrieveNameAndAlias`);
  return [splitSrcLine[0].replace(/\s/g, ""), splitSrcLine[1].replace(/\s/g, ""), element];
}

export function retrieveUrlAliasAs(logger: OutputChannel, line: string): [string, string, string] {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start retrieveUrlAliasAs`);

  let splitLine = [];
  let url = '';
  let alias = '';
  let as = '';

  splitLine = line.split(' ');

  splitLine.forEach((element, index) => {
    switch (element.toLowerCase()) {
      case 'uses':
        url = splitLine[index + 1].slice(1, -1);
        break;
      case 'alias':
        alias = splitLine[index + 1];
        break;
      case 'as':
        as = splitLine[index + 1];
        break;
    }
  });
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End retrieveUrlAliasAs`);

  return [url, alias, as];
}

export function retrieveType(logger: OutputChannel, url: string): string {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start retrieveType`);

  let splitUrl: any[];
  let type: string;

  splitUrl = url.split('/');
  type = splitUrl[splitUrl.length - 1];
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End retrieveType`);

  return type;
}

export async function getAllParamsFromUrl(logger: OutputChannel, url: string, definitionProvider: FhirDefinition): Promise<CompletionItem[]> {
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start getAllParamsFromUrl`);

  const completionItemList: CompletionItem[] = [];

  if (url === '') {
    logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Error url empty`);
    return [];
  }

  if (definitionProvider.fhirEntities && definitionProvider.fhirEntities.has(url)) {
    definitionProvider.fhirEntities.forEach((value, key) => {
      if (key === url) {
        value.elements?.forEach((elem: ElementInfo) => {
          completionItemList.push(new CompletionItem(elem.path));
        });
      }
    });
  } else if (url.includes(definitionProvider.canonicalURL) && !definitionProvider.fhirEntities.has(url)) {
    //registre local ou id#dev => déjà traité lors du chargement des définitions FHIR => reste qu'à afficher le message demandant de build la solution
    completionItemList.push(new CompletionItem("You need to build IG to access autocomplete"));
  }
  logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End getAllParamsFromUrl`);

  return completionItemList;
}

export function testPath(pathToTest: string): boolean {
  try {
    fs.accessSync(path.resolve(pathToTest));
    return true;
  } catch (error) {
    return false;
  }
}

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
