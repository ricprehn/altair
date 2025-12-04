const fs = require('fs');

const inputFile = 'reviewsaltair.json';
const outputFile = 'reviews_data.json';

const ratingMap = {
    'FIVE': 5,
    'FOUR': 4,
    'THREE': 3,
    'TWO': 2,
    'ONE': 1
};

function formatDate(dateStr) {
    try {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    } catch (e) {
        return dateStr;
    }
}

try {
    const content = fs.readFileSync(inputFile, 'utf8');
    const lines = content.split(/\r?\n/);

    let lastValidIndex = -1;

    // Look for the last line that is just "    }," or "    }" indicating end of a review object
    // Based on the file view, it seems to be indented with 4 spaces
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line === '},' || line === '}') {
            // Check indentation if possible, but strict equality to "    }," might be fragile if mixed tabs/spaces
            // Let's assume the last }, at root level (indentation 4) is what we want.
            // But checking indent is hard with trim().
            // Let's check the original line.
            if (lines[i].match(/^\s{4}\},?$/)) {
                lastValidIndex = i;
                break;
            }
        }
    }

    if (lastValidIndex === -1) {
        throw new Error("Could not find any valid review closing brace.");
    }

    // Reconstruct valid JSON
    // We take everything up to lastValidIndex (inclusive)
    // And append the closing of the array and object
    const fixedLines = lines.slice(0, lastValidIndex + 1);
    // Remove comma if present on the last line to make it valid JSON before closing array
    let lastLine = fixedLines[fixedLines.length - 1];
    if (lastLine.trim().endsWith(',')) {
        fixedLines[fixedLines.length - 1] = lastLine.replace(/,$/, '');
    }

    fixedLines.push('  ]');
    fixedLines.push('}');

    const fixedContent = fixedLines.join('\n');

    // Parse
    const data = JSON.parse(fixedContent);

    const processedReviews = [];
    if (data.reviews) {
        data.reviews.forEach(review => {
            const name = (review.reviewer && review.reviewer.displayName) ? review.reviewer.displayName : 'Anonymous';

            let comment = review.comment || '';
            if (comment.includes('(Translated by Google)')) {
                comment = comment.split('(Translated by Google)')[0].trim();
            }

            const rating = ratingMap[review.starRating] || 5;
            const date = formatDate(review.createTime || '');

            if (comment && comment !== "(Sin comentario)") {
                processedReviews.push({
                    name: name,
                    text: comment,
                    rating: rating,
                    date: date
                });
            }
        });
    }

    fs.writeFileSync(outputFile, JSON.stringify(processedReviews, null, 4), 'utf8');
    console.log(`Successfully processed ${processedReviews.length} reviews.`);

} catch (e) {
    console.error(`Error processing reviews: ${e.message}`);
}
