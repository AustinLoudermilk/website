@ECHO OFF

:MENU
CLS
ECHO.
ECHO GIT
ECHO ---
ECHO.
ECHO 1 - status
ECHO 2 - add all
ECHO 3 - reset
ECHO 4 - commit
ECHO.
ECHO 5 - clone
ECHO 6 - Pull
ECHO.
ECHO 7 - exit
ECHO.
SET /P M= ~ 
IF %M%==1 GOTO STATUS
IF %M%==2 GOTO ADD
IF %M%==3 GOTO RESET
IF %M%==4 GOTO COMMIT
IF %M%==5 GOTO CLONE
IF %M%==6 GOTO PULL
IF %M%==7 GOTO EOF

:STATUS
CLS
ECHO.
ECHO --GIT STATUS--
ECHO.
git status
ECHO.
ECHO -- -- -- -- --
pause >nul
GOTO MENU

:ADD
CLS
ECHO.
ECHO --GIT ADD--
ECHO.
git add *
ECHO All files added.
ECHO.
ECHO -- -- -- -- --
pause >nul
GOTO MENU

:RESET
CLS
ECHO.
ECHO --GIT RESET--
ECHO.
git reset
ECHO All files reset.
ECHO.
ECHO -- -- -- -- --
pause >nul
GOTO MENU

:COMMIT
CLS
ECHO.
ECHO --GIT COMMIT--
ECHO.
SET /p M= -m: 
git commit -m %M%
ECHO.
ECHO -- -- -- -- --
ECHO.
SET /P PUSH=Push? (y/n):
ECHO.
ECHO -- -- -- -- --
ECHO.
IF /I "%PUSH%" NEQ "Y" (GOTO MENU) ELSE (git push origin main)
ECHO.
ECHO -- -- -- -- --
pause >nul
GOTO MENU

:CLONE
CLS
ECHO.
ECHO --GIT CLONE--
ECHO.
SET /p URL= url: 
SET /p FOL= folder: 
ECHO.
ECHO -- -- -- -- --
ECHO.
git clone %URL% %FOL%
ECHO.
ECHO -- -- -- -- --
pause >nul
GOTO MENU

:PULL
CLS
ECHO.
ECHO --GIT PULL--
ECHO.
git pull
ECHO.
ECHO -- -- -- -- --
ECHO.
SET /P SUB=Update Submodules? (y/n):
ECHO.
ECHO -- -- -- -- --
ECHO.
IF /I "%SUB%" NEQ "Y" (GOTO MENU) ELSE (GOTO SUBMOD)
ECHO.
ECHO -- -- -- -- --
pause >nul
GOTO MENU

:SUBMOD
CLS
ECHO.
ECHO --UPDATE SUBMODULE--
ECHO.
git submodule init
git submodule update
ECHO.
ECHO -- -- -- -- --
pause >nul
GOTO MENU