
import {ConformanceSearchData} from "models/ConformanceSearchData";
export declare interface UserSettingsData {
    fhirServerUrl?: string;
    fhirTerminologyServerUrl?: string;
    syncFavourites: boolean;
    favouritesListId?: string;
    defaultProviderField?: string;
    defaultNewCanonicalBase?: string;
    showAdvancedSettings: boolean;
    pageSize: number;
}

export namespace settings {

    export function getSearchData(type: string): ConformanceSearchData | undefined {
        const sdJson = localStorage.getItem(`search_${type}`);
        if (sdJson){
            return JSON.parse(sdJson);
        }
        return undefined;
    }

    export function saveSearchData(type: string, data: ConformanceSearchData){
        if (data){
            localStorage.setItem(`search_${type}`, JSON.stringify(data));
        }
        else {
            localStorage.removeItem(`search_${type}`);
        }
    }

    export function getFhirServerUrl(): string {
        try {
            return localStorage.getItem("settings_fhirServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir";
        }
        catch {
            console.log("error reading the FHIR Server URL configuration value");
            return "https://sqlonfhir-r4.azurewebsites.net/fhir";
        }
    }
    export function getFhirTerminologyServerUrl(): string {
        try {
            return localStorage.getItem("settings_fhirTerminologyServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir";
        }
        catch {
            console.log("error reading the FHIR Terminology Server URL configuration value");
            return "https://sqlonfhir-r4.azurewebsites.net/fhir";
        }
    }
    export function getPageSize(): number {
        try {
            return Number.parseInt(localStorage.getItem("settings_pageSize") ?? "10");
        }
        catch {
            console.log("error reading the pageSize configuration value");
            return 10;
        }
    }

    export function showAdvancedSettings(): boolean {
        return !localStorage.getItem("settings_showAdvancedSettings") ? false : true;
    }

    export function load(): UserSettingsData {
        return {
            fhirServerUrl: localStorage.getItem("settings_fhirServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir",
            fhirTerminologyServerUrl: localStorage.getItem("settings_fhirTerminologyServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir",
            syncFavourites: localStorage.getItem("settings_syncFavourites") === 'true',
            favouritesListId: localStorage.getItem("settings_favouritesListId") ?? undefined,

            defaultProviderField: localStorage.getItem("settings_defaultProviderField") ?? undefined,
            defaultNewCanonicalBase: localStorage.getItem("settings_defaultNewCanonicalBase") ?? "http://fhir.forms-lab.org/examples",
            showAdvancedSettings: !localStorage.getItem("settings_showAdvancedSettings") ? false : true,
            pageSize: Number.parseInt(localStorage.getItem("settings_pageSize") ?? "10", 10),
        };
    }

    export function save(settings: UserSettingsData): boolean {
        try {
            if (settings.fhirServerUrl?.endsWith('/')) settings.fhirServerUrl = settings.fhirServerUrl.substring(0, settings.fhirServerUrl.length - 1);
            if (settings.fhirServerUrl) localStorage.setItem("settings_fhirServerURL", settings.fhirServerUrl);

            if (settings.fhirTerminologyServerUrl?.endsWith('/')) settings.fhirTerminologyServerUrl = settings.fhirTerminologyServerUrl.substring(0, settings.fhirTerminologyServerUrl.length - 1);
            if (settings.fhirTerminologyServerUrl) localStorage.setItem("settings_fhirTerminologyServerURL", settings.fhirTerminologyServerUrl);

            if (settings.syncFavourites) localStorage.setItem("settings_syncFavourites", settings.syncFavourites ? 'true' : 'false');
            else localStorage.removeItem("settings_syncFavourites");
            if (settings.syncFavourites && settings.favouritesListId) localStorage.setItem("settings_favouritesListId", settings.favouritesListId);

            if (settings.defaultProviderField) localStorage.setItem("settings_defaultProviderField", settings.defaultProviderField);
            if (settings.defaultNewCanonicalBase) localStorage.setItem("settings_defaultNewCanonicalBase", settings.defaultNewCanonicalBase);
            if (settings.showAdvancedSettings) localStorage.setItem("settings_showAdvancedSettings", settings.showAdvancedSettings ? 'true' : 'false');
            else localStorage.removeItem("settings_showAdvancedSettings");
            if (settings.pageSize) localStorage.setItem("settings_pageSize", settings.pageSize.toString());
            return true;
        }
        catch {
            return false;
        }
    }

    /** Create a Random ID that is 12 chars long */
    export function createRandomID(): string {
        return 'xxxx-xxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
