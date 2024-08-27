const process_argv = require('@warren-bank/node-process-argv')

const argv_flags = {
  "--help":                  {bool: true},
  "--version":               {bool: true},
  "--pretty":                {bool: true},

  "--graph":                 {file: "json"},
  "--dir":                   {file: "path-exists"},

  "--begin":                 {},
  "--end":                   {}
}

const argv_flag_aliases = {
  "--version":               ["-v"],
  "--pretty":                ["-p"],

  "--graph":                 ["-g"],
  "--dir":                   ["-d"],
  "--begin":                 ["-b"],
  "--end":                   ["-e"]
}

let argv_vals = {}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e1) {
  // --graph can be used in 2 different contexts: (1) path to save json file, (2) path to read json file
  //   => failed to read json file; retry and parse value as a file path

  argv_flags["--graph"]["file"] = "path"

  try {
    argv_vals = process_argv(argv_flags, argv_flag_aliases)
  }
  catch(e2) {
    console.log('ERROR: ' + e.message)
    process.exit(1)
  }
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

// normalize smali class names
const normalize_classname = (key) => {
  if (argv_vals[key]) {
    const str = argv_vals[key]
    const len = str.length
    if ((str[0] === 'L') && (str[len - 1] === ';'))
      argv_vals[key] = str.substring(1, len - 1)
  }
}
normalize_classname("--begin")
normalize_classname("--end")

// determine the mode of operation: 'save' or 'query' the graph data
if (argv_vals["--graph"] && (typeof argv_vals["--graph"] === 'string') && argv_vals["--dir"]) {
  argv_vals["--mode"] = "save"
}
else if (argv_vals["--graph"] && (typeof argv_vals["--graph"] === 'object') && argv_vals["--begin"] && argv_vals["--end"]) {
  argv_vals["--mode"] = "query"
}
else {
  console.log("ERROR: Additional parameters are required.")
  process.exit(0)
}

module.exports = argv_vals
