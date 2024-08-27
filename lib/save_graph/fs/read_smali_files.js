const fs = require('fs')

// -----------------------------------------------------------------------------

const read_smali_files = (graph, smali_files) => {
  for (const smali_file of smali_files) {
    read_smali_file(graph, smali_file)
  }
}

const read_smali_file = (graph, smali_file) => {
  const smali_code = fs.readFileSync(smali_file, 'utf8').split(/(?:\r?\n)+/)

  const smali_classname = extract_smali_classname(smali_code)
  if (!smali_classname) return

  const smali_classes = extract_smali_classes(smali_code, smali_classname)
  graph[smali_classname] = format_smali_classes(smali_classes)
}

// -----------------------------------------------------------------------------

const extract_smali_classname = (smali_code) => {
  const prefix = '.class'
  const regex  = /^\.class\s+(?:.*\s+)?L([^\s;]+);$/

  const smali_code_line = smali_code.find(line => (line.indexOf(prefix) === 0) && regex.test(line))

  return smali_code_line
    ? smali_code_line.replace(regex, '$1')
    : null
}

// -----------------------------------------------------------------------------

const extract_smali_classes = (smali_code, smali_classname) => {
  const smali_classes = []
  const regex = /L([^\s;]+);/g
  let match, smali_class

  for (let line of smali_code) {
    if (skip_line(line)) continue

    regex.lastIndex = 0

    while (match = regex.exec(line)) {
      smali_class = match[1]

      if (skip_smali_class(smali_class)) continue

      if (smali_class !== smali_classname) {
        smali_classes.push(smali_class)
      }
    }
  }

  return smali_classes
}

const skip_line = (line) => {
  if (line.indexOf('.class ') === 0) return true
  if (line.indexOf('.super ') === 0) return true
  return false
}

const skip_smali_class = (smali_class) => {
  if (smali_class.indexOf('java/lang/') === 0) return true
  return false
}

// -----------------------------------------------------------------------------

const format_smali_classes = (smali_classes, weight = 1) => {
  const dataset = {}

  for (let smali_class of smali_classes)
    dataset[smali_class] = weight

  return dataset
}

// -----------------------------------------------------------------------------

module.exports = read_smali_files
