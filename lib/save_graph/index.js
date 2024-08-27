const find_smali_files = require('./fs/find_smali_files')
const read_smali_files = require('./fs/read_smali_files')
const write_graph      = require('./fs/write_graph')

const save_graph = (argv_vals) => {
  const graph       = {}
  const smali_files = find_smali_files(argv_vals["--dir"])

  read_smali_files(graph, smali_files)
  write_graph(graph, argv_vals["--graph"])
}

module.exports = save_graph
