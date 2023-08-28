const fs = require("fs");

function findLonelyVariants(files) {
  const icons = new Set();

  for (const file of files) {
    const match = file.match(/^(.*)(Fill|Outline)\.svg$/);
    if (match) {
      const iconName = match[1];
      const iconType = match[2];

      if (!icons.has(iconName)) {
        icons.add(iconName);
      } else {
        // If the icon name is already in the set, it has a variant.
        // Remove it to mark it as paired.
        icons.delete(iconName);
      }
    }
  }

  // At this point, the 'icons' set contains icon names without pairs.
  return Array.from(icons);
}

module.exports = {
  findLonelyVariants,
};
