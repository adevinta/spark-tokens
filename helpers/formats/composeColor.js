module.exports = function ({ dictionary, options, file }) {
  const themeableTokens = dictionary.allProperties
    .filter((token) => {
      return token.attributes.type === "brand";
    })
    // Clean the names to follow Color Scheme for Material Design 3 in Compose
    // https://developer.android.com/jetpack/compose/designsystems/material3#color-scheme
    .map((token) => ({
      ...token,
      name: token.name.charAt(5).toLowerCase() + token.name.slice(6),
    }));

  console.log(themeableTokens);

  return `
  package ${file.packageName}
  import androidx.compose.ui.graphics.Color
  class Colors(\n${themeableTokens
    .map((token) => {
      return `  val ${token.name}: Color,`;
    })
    .join(`\n`)}\n)\n\nfun lightColors(\n${themeableTokens
    .map((token) => {
      const value = tokenToThemedValue(
        dictionary,
        options,
        themeableTokens,
        token
      );
      return `  ${token.name}: Color = ${value},`;
    })
    .join(`\n`)}\n): Colors = Colors(\n${themeableTokens
    .map((token) => {
      return `    ${token.name},`;
    })
    .join(`\n`)}\n)\n\nobject Palette {\n${dictionary.allProperties
    // We need to sort based on how deep the reference trail is, because a value needs to be
    // defined before we reference it in Kotlin
    .sort((token1, token2) => {
      return sortByReferenceDepth(dictionary, token1, token2);
    })
    .filter((token) => {
      return token.attributes.type === "core";
    })
    .map((token) => {
      const value = tokenToValue(dictionary, options, token);
      return `  val ${token.name}: Color = ${value}`;
    })
    .join(`\n`)}\n}`;
};

function tokenToValue(dictionary, options, token) {
  if (
    options.outputReferences &&
    dictionary.usesReference(token.original.value)
  ) {
    const reference = dictionary.getReferences(token.original.value)[0];
    return reference.name;
  } else {
    return token.value;
  }
}

function tokenToThemedValue(dictionary, options, themeableTokens, token) {
  if (
    options.outputReferences &&
    dictionary.usesReference(token.original.value)
  ) {
    const reference = dictionary.getReferences(token.original.value)[0];
    if (themeableTokens.includes(reference)) {
      return reference.name;
    } else {
      return `Palette.${reference.name}`;
    }
  } else {
    return token.value;
  }
}

function tokenToThemedDarkValue(dictionary, options, themeableTokens, token) {
  if (!token.darkValue) {
    return tokenToThemedValue(dictionary, options, themeableTokens, token);
  }

  if (
    options.outputReferences &&
    dictionary.usesReference(token.original.darkValue)
  ) {
    const reference = dictionary.getReferences(token.original.darkValue)[0];
    if (themeableTokens.includes(reference)) {
      return reference.name;
    } else {
      return `Palette.${reference.name}`;
    }
  } else {
    return token.darkValue;
  }
}

function sortByReferenceDepth(dictionary, token1, token2) {
  return tokenDepth(dictionary, token1) - tokenDepth(dictionary, token2);
}

function tokenDepth(dictionary, token) {
  if (dictionary.usesReference(token.original.value)) {
    var reference = dictionary.getReferences(token.original.value)[0];
    return tokenDepth(dictionary, reference) + 1;
  } else {
    return 0;
  }
}
