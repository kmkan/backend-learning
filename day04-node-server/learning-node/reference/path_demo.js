const path = require('path');

// Join paths (cross-platform safe)
const fullPath = path.join('folder', 'subfolder', 'file.txt');
console.log(fullPath);  // → 'folder/subfolder/file.txt'

// Get file extension
console.log(path.extname('index.html'));  // → '.html'

// Get base name
console.log(path.basename('/user/docs/file.txt'));  // → 'file.txt'

// Get directory name
console.log(path.dirname('/user/docs/file.txt'));   // → '/user/docs'

// Resolve to absolute path
console.log(path.resolve('file.txt')); // → '/absolute/path/to/file.txt'
