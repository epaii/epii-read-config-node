"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
let defualtConfig = {
    name: "v0"
};
(0, index_1.readConfig)(defualtConfig, 'test');
console.log(defualtConfig);
