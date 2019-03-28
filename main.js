const fs = require('fs');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { is_miscreant } = require("./is_miscreant");
const { JSDOM } = jsdom;

fetch('http://www.nationalarchives.gov.uk/help-with-your-research/research-guides/?search=&research-category=')
    .then(res => res.text())
    .then(body => {

        const { document } = (new JSDOM(body)).window;
        const listings = document.querySelectorAll(".resource-results li");

        const guides = [];

        Array.prototype.forEach.call(listings, (item) => {

            const first_link = item.querySelector('a');

            if (is_miscreant(first_link.textContent)) {
                return;
            }

            const tags = item.getElementsByClassName('tag');
            const guide = {};

            guide.title = first_link.textContent;
            guide.href = first_link.href;
            guide.tags = [];

            Array.prototype.forEach.call(tags, (tag) => {
                guide.tags.push(tag.textContent);
            });

            guides.push(guide);

        });

        fs.writeFile("./guides.json", JSON.stringify(guides), function (err) {

            if (err) {
                return console.log(err);
            }

            console.log(`${guides.length} guides added to guides.json\n`);
        });

    });