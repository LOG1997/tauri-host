export interface IHostObj {
    line: number;
    ip: string;
    domain: string;
    note: string;
    active: boolean;
    repetitive: boolean;
    ipStatus: "" | "error"
    domainStatus: "" | "error"
    noteStatus: "" | "error"
}