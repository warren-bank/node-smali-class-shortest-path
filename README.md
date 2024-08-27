### [scsp - smali class shortest path](https://github.com/warren-bank/node-smali-class-shortest-path)

#### Purpose:

* [apktool](https://github.com/iBotPeaches/Apktool) generates a root directory having one or more subdirectories that contain .smali files
* when the APK was built using a code obfuscator, the .smali class names are short and meaningless
* the purpose of this command-line utility is to:
  - make it easier to identify a relationship between 2 .smali classes
    * for example:
      - determine a .smali class at which to begin
        * `AndroidManifest.xml` specifies the main Activity for an application
      - determine a .smali class at which to end
        * `strings.xml` maps an error message to its string ID name
        * `public.xml` maps the string ID name to its hex integer ID value
        * grepping for this hex integer ID value can identify the .smali class that uses this string to display the relevant error message
      - the next step is to determine a relationship:
        * how does the main Activity reach the class that produces this error?
        * this utility helps to answer this question by showing the shortest path between the 2 .smali classes
* how exactly is the shortest path determined?
  - with a 2-step process:
    1. produce a data structure that contains a graph of all .smali classes
       - walk the file tree beginning at the root directory
       - detect .smali files
       - read each .smali file and extract a list of all other .smali classes referenced by its code
    2. query the graph data
       - using [this implementation](https://github.com/tcort/dijkstrajs) of Dijkstra's single-source shortest-paths algorithm
       - write the result to stdout

#### Installation:

```bash
npm install --global @warren-bank/node-smali-class-shortest-path
```

#### Usage:

```text
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
```

#### Example:

1. produce the graph data structure (once)
   ```bash
     scsp --graph "/path/to/graph.json" --dir "/path/to/decoded/apk/directory"
   ```
2. query the graph data structure (repeatedly)
   ```bash
     scsp --graph "/path/to/graph.json" --begin "com/github/warren-bank/app/MainActivity" --end "com/github/warren-bank/app/utils/Account" -p
   ```
   - notes:
     * smali syntax wraps class name identifiers with a leading "L" and trailing ";"
       - these characters are optional for values passed to `--begin` and `--end`
       - if both are included, they are stripped to normalize format

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
