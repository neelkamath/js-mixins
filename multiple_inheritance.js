// Example of multiple inheritance

'use strict';

// Base printer class.
class Printer {
    print(page) {
        console.log(`Printing page: ${page}`);
        return this;
    }
}

// Mixin 1: Functionality relating to fax.
let fax = superclass => class extends superclass {
    constructor(faxNum = '+1 898 378 0983') {
        super();
        this.faxNum = faxNum;
    }

    sendFax(message, destination) {
        console.log(`Sending fax with data ${message} to ${destination}`);
        return this;
    }

    showFaxNumber() {
        console.log(`Your fax number is ${this.faxNum}`);
        return this;
    }
};

// Mixin 2: Functionality relating to colour printing.
let colourPrint = superclass => class extends superclass {
    // This function overrides print() from the superclass.
    print(page = '') {
        console.log(`Colour Printing page: \x1b[32m${page}\x1b[0m`);
        return this;
    }
};

// Mixin 3: Functionality relating to scanning.
let scan = superclass => class extends superclass {
    scanFile(file = '') {
        console.log(`Scanning document: ${file}`);
        return this;
    }
};

// Mixin 4: Compound mixin that combines fax and colour printing functions.
let colourAndFax = (superclass) => fax(colourPrint(superclass));

// Concrete Epson printer that has specific functionality on top of what is offered in the base Printer class.
class EpsonPrinter extends colourAndFax(Printer) {
    constructor() {
        super();
        console.log(`[Epson Printer]`);
    }

    print(page) {
        super.print(page);
        return this;
    }
}

// Concrete Canon printer that allows scanning and fax only.
class CanonPrinter extends scan(fax(Printer)) {
    constructor() {
        super();
        console.log(`[Canon Printer]`);
    }

    print(page) {
        super.print(page);
        return this;
    }
}


const p = new EpsonPrinter();
p.print('Phasellus malesuada in lectus ac.');
p.showFaxNumber().sendFax('Lorem Ipsum', '+1 323 555 1234');
// p.scanFile('abc'); // Not allowed since Epson printers don't support this.

console.log();

const c = new CanonPrinter();
c.scanFile('Duis ac risus in justo.');
c.print('Donec consequat eros interdum tellus.');