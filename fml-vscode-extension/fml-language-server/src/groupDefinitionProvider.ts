import {LanguageDiagnostic, LanguagePosition, LanguageRange} from "@fhirpath-lab/language-service";
import {Location} from "vscode-languageserver/node";
import {WorkspaceFmlIndex} from "./WorkspaceFmlIndex";

export function findGroupDefinitions(
    index: WorkspaceFmlIndex,
    sourceUri: string,
    position: LanguagePosition,
): Location[] | null {
    const navigationDocuments = index.getNavigationDocuments(sourceUri);
    const reference = navigationDocuments.get(sourceUri)?.references.find(candidate => {
        return containsPosition(candidate.range, position);
    });
    if (!reference) {
        return null;
    }

    const locations: Location[] = [];
    for (const [uri, symbols] of navigationDocuments) {
        for (const definition of symbols.definitions) {
            if (definition.name === reference.name) {
                locations.push(Location.create(uri, definition.range));
            }
        }
    }
    return locations.length > 0 ? locations : null;
}

export function getUnresolvedGroupDiagnostics(
    index: WorkspaceFmlIndex,
    sourceUri: string,
): LanguageDiagnostic[] {
    const navigationDocuments = index.getNavigationDocuments(sourceUri);
    const source = navigationDocuments.get(sourceUri);
    if (!source) {
        return [];
    }

    const availableGroups = new Set<string>();
    for (const symbols of navigationDocuments.values()) {
        for (const definition of symbols.definitions) {
            availableGroups.add(definition.name);
        }
    }

    return source.references
        .filter(reference => !availableGroups.has(reference.name))
        .map(reference => ({
            range: reference.range,
            severity: "warning",
            message: `Group '${reference.name}' was not found in this map or its imports.`,
            source: "FHIR Mapping Language Tools",
            offendingText: reference.name,
        }));
}

function containsPosition(range: LanguageRange, position: LanguagePosition): boolean {
    return comparePositions(position, range.start) >= 0
        && comparePositions(position, range.end) < 0;
}

function comparePositions(left: LanguagePosition, right: LanguagePosition): number {
    return left.line === right.line
        ? left.character - right.character
        : left.line - right.line;
}
