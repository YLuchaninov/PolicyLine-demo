const fs = require('fs');
const { Policy } = require('policyline');
const path = require('path');

const pth = path.resolve(process.env.PWD, './abac/json'); // path from root index.js
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
    condition: () => {
    }
};

// make Promise version of fs.readdir()
function readdirAsync(dirname) {
    return new Promise(function (resolve, reject) {
        fs.readdir(dirname, function (err, filenames) {
            if (err)
                reject(err);
            else
                resolve(filenames);
        });
    });
}

// make Promise version of fs.readFile()
function readFileAsync(filename, enc) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, enc, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}

function extract(expression) {
    let tokens = expression.split(/\s+|(?=\(|\))|\b/);
    return tokens.filter((elm) => !operators.includes(elm));
}

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