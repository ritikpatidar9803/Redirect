const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the GitHub repository directory where the GitHub Pages are stored
const REPO_DIR = path.resolve(__dirname, 'your-github-repository'); // Replace with your local repo path
const REDIRECT_DIR = path.join(REPO_DIR, 'Redirect'); // Folder where redirect pages will be stored

// Define the link database (you should have this from your system or it can be dynamically created)
const linkDatabase = {
    'esmmow': 'https://getbootstrap.com/',
    'xyz456': 'https://example.com/xyz456',
    'def789': 'https://example.com/def789'
};

// Function to generate an HTML redirect page
function generateRedirectPage(shortId, sourceLink) {
    const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="refresh" content="0;url=${sourceLink}">
        <title>Redirecting...</title>
    </head>
    <body>
        <p>Redirecting to <a href="${sourceLink}">${sourceLink}</a>...</p>
    </body>
    </html>
    `;

    // Create the file path
    const filePath = path.join(REDIRECT_DIR, `${shortId}.html`);
    
    // Write the HTML content to the file
    fs.writeFileSync(filePath, content);
    console.log(`Redirect page created for ${shortId}`);
}

// Function to commit and push changes to GitHub
function commitAndPushChanges() {
    try {
        // Add all new files
        execSync('git add .', { cwd: REPO_DIR });

        // Commit the changes
        execSync('git commit -m "Automated redirect page generation"', { cwd: REPO_DIR });

        // Push the changes to GitHub
        execSync('git push origin main', { cwd: REPO_DIR }); // Replace "main" with your branch name
        console.log('Changes pushed to GitHub');
    } catch (error) {
        console.error('Error during Git operations:', error);
    }
}

// Generate redirect pages for each link in the database
Object.keys(linkDatabase).forEach(shortId => {
    generateRedirectPage(shortId, linkDatabase[shortId]);
});

// Commit and push the changes to GitHub
commitAndPushChanges();
