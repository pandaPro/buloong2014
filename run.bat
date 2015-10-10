echo off
cd F:\Projects\nodejs
explorer . 

start cmd /k F:\Projects\nodejs\mongo-server.bat
ping 127.0.0.1 -n 2 > nul
start cmd /k F:\Projects\nodejs\buloong-node\buloong-start.cmd
exit