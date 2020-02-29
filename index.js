const inquierer = require("inquirer");
const fs = require("fs");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");
const axios = require("axios");

// const writeFileAsync1 = util.promisify(fs.writeFile);

function promptUser() {
    return inquierer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the title of the project?"
    },
    {
        type: "input",
        name: "description",
        message: "How would you briefly describe the project?"
    },
    {
        type: "input",
        name: "contents",
        message: "What are the contents of the project?"
    },
    {
        type: "input",
        name: "installation",
        message: "How is the project installed?"
    },
    {
        type: "input",
        name: "usage",
        message: "How is the project used?"
    },
    {
        type: "input",
        name: "license",
        message: "What are the licenses used for the project?"
    },
    {
        type: "input",
        name: "contributions",
        message: "How can others contribute to the project?"
    },
    {
        type: "input",
        name: "test",
        message: "How do you test the project?"
    },
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    }
])};



function generate(data, git) {
    fs.writeFile(`${data.title}README.md`, generateMarkdown(data, git), (err) => {
        if (err) {
            throw err;
        }
    })
}

async function init() {
    console.log("hi")
    try {
        const answers = await promptUser();

        const README = await api(answers.github);

        await generate(answers, README);

        console.log("Successfully generated README.md");
    } catch (err) {
        console.log(err);
    }

}

init();
