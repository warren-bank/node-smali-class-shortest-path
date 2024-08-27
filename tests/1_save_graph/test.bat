@echo off

set scsp=%~dp0..\..\bin\scsp.js

set root_dir=%~dp0..\0_sample_data
set graph_json=%root_dir%\graph.json

call node "%scsp%" --graph "%graph_json%" --dir "%root_dir%"

echo.
pause
