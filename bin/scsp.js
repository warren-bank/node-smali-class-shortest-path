#! /usr/bin/env node

const argv_vals = require('./scsp/process_argv')
const {save_graph, find_path} = require('../lib/process_cli')

if (argv_vals["--mode"] === "save")
  save_graph(argv_vals)
else if (argv_vals["--mode"] === "query")
  find_path(argv_vals)
