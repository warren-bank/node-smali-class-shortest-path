const help = `
usage:
======
scsp <options>

========
options:
========
"--help"
    Print a summary of all command-line options.

"-v"
"--version"
    Print the current version.

"-g" <filepath>
"--graph" <filepath>
    Specify path to the graph data structure

"-d" <dirpath>
"--dir" <dirpath>
    Specify path to the root directory containing .smali files

"-b" <classname>
"--begin" <classname>
    Specify .smali class name at which to begin search

"-e" <classname>
"--end" <classname>
    Specify .smali class name at which to end search

"-p"
"--pretty"
    Pretty print the shortest path result
`

module.exports = help
