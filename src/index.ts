import path from 'path';
import fs from "fs";

let argsConfig = process.argv.splice(2).filter(item => item.startsWith("--")).reduce((o: any, item: string, index: number) => {
    let tmp = item.substring(2).split("=");
    if (tmp.length === 1) tmp[1] = "1";
    o[tmp[0]] = tmp[1];
    return o;
}, {});



const projectConfigFilePath = path.dirname(process.argv[1]) + path.sep;

const currentDirConfigPath = process.cwd() + path.sep

let projectConfig: any = null;
let currentDirConfig: any = null;


export function getConfigFromDir(dir: string) {
    try {
        let f = "";
        if (fs.existsSync(f = dir + "epii.config.json")) {
            return JSON.parse(fs.readFileSync(f).toString());
        } else if (fs.existsSync(f = dir + "epii.config.js")) {
            return require(projectConfigFilePath);
        }
    } catch (error) {

    }
    return null;

}

currentDirConfig = getConfigFromDir(currentDirConfigPath);

projectConfig = getConfigFromDir(projectConfigFilePath);


if (argsConfig["epii.config"]) {

    if (fs.existsSync(argsConfig["epii.config"])) {
        try {

            if (argsConfig["epii.config"].endsWith(".json"))
                argsConfig = Object.assign(JSON.parse(fs.readFileSync(argsConfig["epii.config"]).toString()), argsConfig);
            else {
                argsConfig = Object.assign(require(argsConfig["epii.config"]), argsConfig);
            }
        } catch (error) {

        }
    }
}



export function getDataByNamespace(data:any,namespace=""){
    if(namespace.length===0) return data;
    let out:any = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
             if(key.startsWith(namespace+".")){
                out[key.substring((namespace+".").length)] = data[key];
             }   
        }
    }
    return out;

}



export function readArgsConfig() {
    return argsConfig;
}

export function readProjectConfig() {

    return projectConfig;
}

export function readCurrentDirConfig() {

    return currentDirConfig;
}

export function readConfig<T extends Record<string, any>>(defualtConfig: T | any = {}, namespace: string = ""): T {
    if (projectConfig) Object.assign(defualtConfig, getDataByNamespace(projectConfig,namespace));
    if (currentDirConfig) Object.assign(defualtConfig, getDataByNamespace(currentDirConfig,namespace));
    if (argsConfig) Object.assign(defualtConfig, getDataByNamespace(argsConfig,namespace));
    return defualtConfig;
}