const fs = require('fs')

const write_graph = (graph_data, graph_filepath) => {
  fs.writeFileSync(
    graph_filepath,
    JSON.stringify(graph_data, null, 2),
    'utf8'
  )
}

module.exports = write_graph
