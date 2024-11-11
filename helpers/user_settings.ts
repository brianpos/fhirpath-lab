
import {ConformanceSearchData} from "models/ConformanceSearchData";
import { VariableData } from "~/models/testenginemodel";

export declare interface UserSettingsData {
    fhirServerUrl?: string;
    OAuthClientId?: string;
    fhirTerminologyServerUrl?: string;
    fhirServerExamplesUrl?: string;
    syncFavourites: boolean;
    favouritesListId?: string;
    defaultProviderField?: string;
    defaultNewCanonicalBase?: string;

    openAIApiVersion?: string; // 2023-03-15-preview
    openAIBasePath?: string; // empty will use the chatGPT system default, not Azure
    openAIKey?: string;
    openAIModel?: string; // gpt-3.5-turbo, gpt-4
    openAIFastModel?: string; // gpt-3.5-turbo, gpt-4 (use in places where require a quick response, but lower quality is ok)
    showAIKey: boolean;
    openAIFeedbackEnabled?: boolean; // will the send feedback buttons be enabled/shown

    showAdvancedSettings: boolean;
    pageSize: number;
}

export declare interface ILastUsedParameters {
    context: string | undefined;
    expression: string | undefined;
    resourceId?: string;
    resourceJson?: string | undefined;
    engine: string;
    variables?: VariableData[];
    loadCompleted?: boolean;
}

var serverConnections = require('~/static/config.json');

export namespace settings {

    export function saveLastUsedParameters(data: ILastUsedParameters | undefined):void {
        if (data){
            localStorage.setItem(`lastUsed`, JSON.stringify(data));
        }
        else {
            localStorage.removeItem(`lastUsed`);
        }
    }

    export function loadLastUsedParameters(): ILastUsedParameters | undefined {
        const sdJson = localStorage.getItem(`lastUsed`);
        if (sdJson){
            return JSON.parse(sdJson);
        }
        return undefined;
    }

    export function getTabSpaces(): number {
        return 2;
    }
    export function dotnet_server_downloader(): string {
        return serverConnections.dotnet_server_downloader;
    }
    export function dotnet_server_r4b(): string {
        return serverConnections.dotnet_server_r4b;
    }
    export function dotnet_server_r5(): string {
        return serverConnections.dotnet_server_r5;
    }
    export function java_server_r4b(): string {
        return serverConnections.java_server_r4b;
    }
    export function java_server_r5(): string {
        return serverConnections.java_server_r5;
    }
    export function ibm_server_r4b(): string {
        return serverConnections.ibm_server_r4b;
    }
    export function mapper_server(): string {
        return serverConnections.mapper_server;
    }
    export function mapper_server_java(): string {
        return serverConnections.mapper_server_java;
    }
    export function python_server_r4b(): string {
        return serverConnections.python_server_r4b;
    }
    export function clojure_server_r4(): string {
        return serverConnections.clojure_server_r4;
    }
    export function clojure_server_r5(): string {
        return serverConnections.clojure_server_r5;
    }
    
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

    export function getFhirServerExamplesUrl(): string {
        try {
            return localStorage.getItem("settings_fhirServerExamplesURL") ?? "https://hapi.fhir.org/baseR4";
        }
        catch {
            console.log("error reading the FHIR Server Examples URL configuration value");
            return "https://hapi.fhir.org/baseR4";
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
    export function getDefaultProviderField(): string|undefined {
        try {
            return localStorage.getItem("settings_defaultProviderField") ?? undefined;
        }
        catch {
            console.log("error reading the defaultProviderField configuration value");
            return undefined;
        }
    }

    export function getDefaultNewCanonicalBase(): string|undefined {
        try {
            return localStorage.getItem("settings_defaultNewCanonicalBase") ?? undefined;
        }
        catch {
            console.log("error reading the defaultNewCanonicalBase configuration value");
            return undefined;
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
    export function getOpenAIKey(): string|undefined {
        try {
            return localStorage.getItem("settings_openAIkey") ?? undefined;
        }
        catch {
            console.log("error reading the OpenAI API key configuration value");
            return undefined;
        }
    }
    export function getOpenAIFeedbackEnabled(): boolean|undefined {
        try {
            return localStorage.getItem("settings_openAIFeedbackEnabled") === 'true';
        }
        catch {
            console.log("error reading the OpenAI Feedback Enabled configuration value");
            return undefined;
        }
    }

    export function getOpenAIBasePath(): string|undefined {
        try {
            return localStorage.getItem("settings_openAIBasePath") ?? undefined;
        }
        catch {
            console.log("error reading the OpenAI BasePath configuration value");
            return undefined;
        }
    }

    export function getOpenAIApiVersion(): string|undefined {
        try {
            return localStorage.getItem("settings_openAIApiVersion") ?? undefined;
        }
        catch {
            console.log("error reading the OpenAI API Version configuration value");
            return undefined;
        }
    }

    export function getOpenAIModel(): string|undefined {
        try {
            return localStorage.getItem("settings_openAIModel") ?? undefined;
        }
        catch {
            console.log("error reading the OpenAI Model configuration value");
            return undefined;
        }
    }

    export function getOpenAIFastModel(): string|undefined {
        try {
            return localStorage.getItem("settings_openAIFastModel") ?? undefined;
        }
        catch {
            console.log("error reading the OpenAI Fast Model configuration value");
            return undefined;
        }
    }

    export function showAdvancedSettings(): boolean {
        return !localStorage.getItem("settings_showAdvancedSettings") ? false : true;
    }

    export function load(): UserSettingsData {
        return {
            fhirServerUrl: localStorage.getItem("settings_fhirServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir",
            fhirServerExamplesUrl: localStorage.getItem("settings_fhirServerExamplesURL") ?? "https://hapi.fhir.org/baseR4",
            OAuthClientId: localStorage.getItem("settings_OAuthClientId") ?? undefined,
            fhirTerminologyServerUrl: localStorage.getItem("settings_fhirTerminologyServerURL") ?? "https://sqlonfhir-r4.azurewebsites.net/fhir",
            syncFavourites: localStorage.getItem("settings_syncFavourites") === 'true',
            favouritesListId: localStorage.getItem("settings_favouritesListId") ?? undefined,

            defaultProviderField: localStorage.getItem("settings_defaultProviderField") ?? undefined,
            defaultNewCanonicalBase: localStorage.getItem("settings_defaultNewCanonicalBase") ?? "http://fhir.forms-lab.org/examples",
            openAIKey: localStorage.getItem("settings_openAIkey") ?? undefined,
            openAIBasePath: localStorage.getItem("settings_openAIBasePath") ?? undefined,
            openAIApiVersion: localStorage.getItem("settings_openAIApiVersion") ?? undefined,
            openAIModel: localStorage.getItem("settings_openAIModel") ?? undefined,
            openAIFastModel: localStorage.getItem("settings_openAIFastModel") ?? undefined,
            openAIFeedbackEnabled: localStorage.getItem("settings_openAIFeedbackEnabled") === 'true',
            showAIKey: false,
            showAdvancedSettings: !localStorage.getItem("settings_showAdvancedSettings") ? false : true,
            pageSize: Number.parseInt(localStorage.getItem("settings_pageSize") ?? "10", 10),
        };
    }

    export function save(settings: UserSettingsData): boolean {
        try {
            if (settings.fhirServerUrl?.endsWith('/')) settings.fhirServerUrl = settings.fhirServerUrl.substring(0, settings.fhirServerUrl.length - 1);
            if (settings.fhirServerUrl) localStorage.setItem("settings_fhirServerURL", settings.fhirServerUrl);

            if (settings.fhirServerExamplesUrl?.endsWith('/')) settings.fhirServerExamplesUrl = settings.fhirServerExamplesUrl.substring(0, settings.fhirServerExamplesUrl.length - 1);
            if (settings.fhirServerExamplesUrl) localStorage.setItem("settings_fhirServerExamplesURL", settings.fhirServerExamplesUrl);

            if (settings.OAuthClientId) localStorage.setItem("settings_OAuthClientId", settings.OAuthClientId);
            else localStorage.removeItem("settings_OAuthClientId");

            if (settings.fhirTerminologyServerUrl?.endsWith('/')) settings.fhirTerminologyServerUrl = settings.fhirTerminologyServerUrl.substring(0, settings.fhirTerminologyServerUrl.length - 1);
            if (settings.fhirTerminologyServerUrl) localStorage.setItem("settings_fhirTerminologyServerURL", settings.fhirTerminologyServerUrl);

            if (settings.syncFavourites) localStorage.setItem("settings_syncFavourites", settings.syncFavourites ? 'true' : 'false');
            else localStorage.removeItem("settings_syncFavourites");
            if (settings.syncFavourites && settings.favouritesListId) localStorage.setItem("settings_favouritesListId", settings.favouritesListId);

            if (settings.defaultProviderField) localStorage.setItem("settings_defaultProviderField", settings.defaultProviderField);
            else localStorage.removeItem("settings_defaultProviderField");
            if (settings.defaultNewCanonicalBase) localStorage.setItem("settings_defaultNewCanonicalBase", settings.defaultNewCanonicalBase);
            else localStorage.removeItem("settings_defaultNewCanonicalBase");
            
            if (settings.openAIKey) localStorage.setItem("settings_openAIkey", settings.openAIKey);
            else localStorage.removeItem("settings_openAIkey");
            
            if (settings.openAIBasePath) localStorage.setItem("settings_openAIBasePath", settings.openAIBasePath);
            else localStorage.removeItem("settings_openAIBasePath");
            if (settings.openAIApiVersion) localStorage.setItem("settings_openAIApiVersion", settings.openAIApiVersion);
            else localStorage.removeItem("settings_openAIApiVersion");
            if (settings.openAIModel) localStorage.setItem("settings_openAIModel", settings.openAIModel);
            else localStorage.removeItem("settings_openAIModel");
            if (settings.openAIFastModel) localStorage.setItem("settings_openAIFastModel", settings.openAIFastModel);
            else localStorage.removeItem("settings_openAIFastModel");
            if (settings.openAIFeedbackEnabled) localStorage.setItem("settings_openAIFeedbackEnabled", settings.openAIFeedbackEnabled ? 'true' : 'false');
            else localStorage.removeItem("settings_openAIFeedbackEnabled");


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
