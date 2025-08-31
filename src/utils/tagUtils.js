export const startCaseWords = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const generateHashtags = (tags) => {
  const hashtags = tags.map((tag) => {
    const formattedTag = tag.replace(/\s/g, '')
    return `#${formattedTag}`
  })
  return hashtags.join(' ')
}

export const generateSemicolonSeparated = (tags) => {
  return tags.join(';')
}

export const generateCommaSeparated = (tags) => {
  return tags.join(',')
}