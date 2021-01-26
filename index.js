#!/usr/bin/env node
const { getCode } = require('country-list')
const chalk = require('chalk')
const axios = require('axios').default;
const figlet = require('figlet');
const myArgs = process.argv.slice(2);

let year;
if (myArgs[1]) {
    year = myArgs[1]
} else {
    year = new Date().getFullYear();
}

axios.get(`https://date.nager.at/api/v2/publicholidays/${year}/${getCode(myArgs[0])}`)
.then(function (response) {
    figlet(`${myArgs[0]}'s holidays`, (err, data) => {
        if (err) {
            console.log('Oups');
            console.dir(err);
            return;
        }
        console.log(data);
        console.log(chalk.blue('-----------------------'));
        response.data.forEach(holiday => {
            console.log(`${chalk.green.bold(holiday.date)} => ${holiday.name}`);
        });
        console.log(chalk.blue('-----------------------'));
    });
    
    
})
.catch(function (error) {
    console.log(`An error occured: ${error.response.status} - ${error.response.statusText}`);
});