const dijkstra = require('dijkstrajs')

const find_path = (argv_vals) => {
  const path = dijkstra.find_path(
    argv_vals["--graph"],
    argv_vals["--begin"],
    argv_vals["--end"]
  )

  if (argv_vals["--pretty"])
    console.log(JSON.stringify(path, null, 2))
  else
    console.log(JSON.stringify(path))
}

module.exports = find_path
