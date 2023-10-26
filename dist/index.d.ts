export declare function getConfigFromDir(dir: string): any;
export declare function getDataByNamespace(data: any, namespace?: string): any;
export declare function readArgsConfig(): any;
export declare function readProjectConfig(): any;
export declare function readCurrentDirConfig(): any;
export declare function readConfig<T extends Record<string, any>>(defualtConfig?: T | any, namespace?: string): T;
export declare function getConfig(key?: string | null, dvalue?: string | number | null): any;
export declare function configContainKey(key: string): boolean;
