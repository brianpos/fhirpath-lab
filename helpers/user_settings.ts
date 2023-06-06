
import {ConformanceSearchData} from "models/ConformanceSearchData";
export declare interface UserSettingsData {
    fhirServerUrl?: string;
    OAuthClientId?: string;
    fhirTerminologyServerUrl?: string;
    syncFavourites: boolean;
    favouritesListId?: string;
    defaultProviderField?: string;
    defaultNewCanonicalBase?: string;
    openAIkey?: string;
    showAIKey: boolean;
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
    export function getOAuthClientId(): string|undefined {
        try {
            return localStorage.getItem("settings_OAuthClientId") ?? undefined;
        }
        catch {
            console.log("error reading the OAuthClientId configuration value");
            return undefined;
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
    export function getOpenAIkey(): string|undefined {
        try {
            return localStorage.getItem("settings_openAIkey") ?? undefined;
        }
        catch {
            console.log("error reading the OpenAI API key configuration value");
            return undefined;
        }
    }

    export function showAdvancedSettings(): boolean {
        return !localStorage.getItem("settings_showAdvancedSettings") ? false : true;
    }

    export function load(): UserSettingsData {
        return {
            fhirServerUrl: localStorage.getItem("settings_fhirServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir",
            OAuthClientId: localStorage.getItem("settings_OAuthClientId") ?? undefined,
            fhirTerminologyServerUrl: localStorage.getItem("settings_fhirTerminologyServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir",
            syncFavourites: localStorage.getItem("settings_syncFavourites") === 'true',
            favouritesListId: localStorage.getItem("settings_favouritesListId") ?? undefined,

            defaultProviderField: localStorage.getItem("settings_defaultProviderField") ?? undefined,
            defaultNewCanonicalBase: localStorage.getItem("settings_defaultNewCanonicalBase") ?? "http://fhir.forms-lab.org/examples",
            openAIkey: localStorage.getItem("settings_openAIkey") ?? undefined,
            showAIKey: false,
            showAdvancedSettings: !localStorage.getItem("settings_showAdvancedSettings") ? false : true,
            pageSize: Number.parseInt(localStorage.getItem("settings_pageSize") ?? "10", 10),
        };
    }

    export function save(settings: UserSettingsData): boolean {
        try {
            if (settings.fhirServerUrl?.endsWith('/')) settings.fhirServerUrl = settings.fhirServerUrl.substring(0, settings.fhirServerUrl.length - 1);
            if (settings.fhirServerUrl) localStorage.setItem("settings_fhirServerURL", settings.fhirServerUrl);

            if (settings.OAuthClientId) localStorage.setItem("settings_OAuthClientId", settings.OAuthClientId);
            else localStorage.removeItem("settings_OAuthClientId");

            if (settings.fhirTerminologyServerUrl?.endsWith('/')) settings.fhirTerminologyServerUrl = settings.fhirTerminologyServerUrl.substring(0, settings.fhirTerminologyServerUrl.length - 1);
            if (settings.fhirTerminologyServerUrl) localStorage.setItem("settings_fhirTerminologyServerURL", settings.fhirTerminologyServerUrl);

            if (settings.syncFavourites) localStorage.setItem("settings_syncFavourites", settings.syncFavourites ? 'true' : 'false');
            else localStorage.removeItem("settings_syncFavourites");
            if (settings.syncFavourites && settings.favouritesListId) localStorage.setItem("settings_favouritesListId", settings.favouritesListId);

            if (settings.defaultProviderField) localStorage.setItem("settings_defaultProviderField", settings.defaultProviderField);
            if (settings.defaultNewCanonicalBase) localStorage.setItem("settings_defaultNewCanonicalBase", settings.defaultNewCanonicalBase);
            if (settings.openAIkey) localStorage.setItem("settings_openAIkey", settings.openAIkey);
            else localStorage.removeItem("settings_openAIkey");
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
