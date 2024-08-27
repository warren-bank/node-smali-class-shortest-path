@echo off

set scsp=%~dp0..\..\bin\scsp.js

set root_dir=%~dp0..\0_sample_data
set graph_json=%root_dir%\graph.json

set class_begin=B
set class_end=C

set log_file=%~dpn0.log

call node "%scsp%" --graph "%graph_json%" --begin "%class_begin%" --end "%class_end%" >"%log_file%"

echo.
pause
