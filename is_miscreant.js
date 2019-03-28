const is_miscreant = (text) => {
    switch (true) {
        case /.*Discovery\shelp/.test(text):
            console.log(`Miscreant found in: '${text}'\n`);
            return true;
    }
};

exports.is_miscreant = is_miscreant;
