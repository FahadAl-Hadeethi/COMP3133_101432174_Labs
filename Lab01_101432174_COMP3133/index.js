const fs = require('fs');
const csv = require('csv-parser');

// Delete existing files
if (fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt');
    console.log('Deleted existing canada.txt file.');
}
if (fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt');
    console.log('Deleted existing usa.txt file.');
}

// Stream the CSV file
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country.toLowerCase() === 'canada') {
            fs.appendFileSync('canada.txt', `${row.country},${row.year},${row.population}\n`);
        } else if (row.country.toLowerCase() === 'united states') {
            fs.appendFileSync('usa.txt', `${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        console.log('CSV file processing completed.');
    });
