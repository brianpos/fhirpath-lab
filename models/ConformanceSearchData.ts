export interface ConformanceSearchData {
    name?: string;
    status?: string;
    useContext?:  { system?: string, code: string; display: string; }[];
    publisher?: string;
    lastSearchQuery?: string;
}
