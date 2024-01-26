const fs = require('fs');
const path = require('path');
const yauzl = require('yauzl');
const getLine = require('../utils/line'); // Import the line module

exports.getFile = async (req, res) => {
    const DATA_DIR = path.join(__dirname, '../tmp/data');

    console.log(DATA_DIR);
    const { n, m } = req.query;
    if (!n) {
        return res.status(400).send('Parameter "n" is required');
    }

    const zipFilePath = path.join(DATA_DIR, `${n}.zip`);
    const filePath = path.join(DATA_DIR, `${n}.txt`);
    // console.log(filePath);

    if (!fs.existsSync(zipFilePath)) {
        return res.status(404).send(`File ${n}.zip not found`);
    }

    // Unzip the file
    yauzl.open(zipFilePath, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
            return res.status(500).send(`Error opening zip file: ${err.message}`);
        }

        zipfile.readEntry();
        zipfile.on('entry', (entry) => {
            if (/\/$/.test(entry.fileName)) {
                // Directory entry, skip
                zipfile.readEntry();
            } else {
                // File entry
                zipfile.openReadStream(entry, (err, readStream) => {
                    if (err) throw err;

                    // Create the write stream for the extracted file
                    const writeStream = fs.createWriteStream(filePath);

                    // Pipe the read stream to the write stream
                    readStream.pipe(writeStream);

                    // When the write stream is finished, continue processing
                    writeStream.on('finish', () => {
                        zipfile.readEntry();
                        if (!m) {
                            const fileContent = fs.readFileSync(filePath, 'utf8');
                            return res.send(fileContent);
                        } else {
                            processFileWithLine(m, filePath, res);
                        }
                    });
                });
            }
        });

        zipfile.on('end', () => {
            // Zip extraction complete
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting temporary file ${filePath}: ${err.message}`);
                }
            });

        });
    });

    function processFileWithLine(lineNumber, filePath, res) {
        getLine(parseInt(lineNumber) - 1, filePath)
            .then((lineContent) => {
                // Do something with the line content based on your requirements
                res.send(lineContent);
            })
            .catch((error) => {
                // Handle errors from getLine function
                res.status(500).send(error.message);
            });
    }
};
