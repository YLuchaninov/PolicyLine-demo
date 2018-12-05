const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const { Policy } = require('policyline');

const pth = path.resolve(global.__root, './abac/json'); // path from root index.js
const pathToExpression = pth + '/expression.json';
const pathToPolicies = pth + '/policies';

const controller = {};
const operators = ['AND', 'OR', '(', ')'];

// fake policy will be returned before done loading of policies
const fakePolicy = {
    check: () => {
        console.warn('fake policy was checking!');
        return false;
    },
    getConditions: () => {
    }
};

const readdirAsync = promisify(fs.readdir);

const readFileAsync = promisify(fs.readFile);

const extract = expression => expression.split(/\s+|(?=\(|\))|\b/).filter(elm => !operators.includes(elm));

function createPolicyObj(keys, object) {
    const result = {};
    for (let key of keys) {
        result[key] = object[key];
    }
    return result;
}

function mergePolicyObjects(target, expressions, policies) {
    let policyNames, policyObj;
    for (let key in expressions) {
        policyNames = extract(expressions[key]);
        policyObj = createPolicyObj(policyNames, policies);

        target[key] = {
            expression: expressions[key],
            policies: policyObj
        };
    }
}

async function loadPolicies() {
    const policies = {};
    let expressions, json, files;
    try {
        expressions = JSON.parse(await readFileAsync(pathToExpression, 'utf-8')).expressions;
        files = await readdirAsync(pathToPolicies);
    } catch (e) {
        console.error('Error in expression file parsing:\n', e);
        return;
    }

    files = files.filter((elm) => /\.json/gi.test(elm));
    for (let fileName of files) {
        try {
            json = JSON.parse(await readFileAsync(pathToPolicies + '/' + fileName, 'utf-8'));
            for (let key in json.policies) {
                policies[key] = json.policies[key];
            }
        } catch (e) {
            console.error('Error in ' + fileName + ' file parsing:\n', e);
        }
    }

    return { expressions, policies };
}

loadPolicies().then((data) => {
    mergePolicyObjects(controller, data.expressions, data.policies);

    // compile policies
    for (let key in controller) {
        controller[key] = new Policy(controller[key]);
    }

    console.log('\n\n>> policies was compiled!\n\n');
}).catch((e) => {
    console.warn(e);
});

module.exports = (policyName) => {
    return function () {
        return controller[policyName] || fakePolicy;
    }
};