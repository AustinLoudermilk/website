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
ECHO 6 - pull
ECHO.
ECHO 7 - exit
ECHO.
SET /P M= ~ 
IF %M%==1 GOTO STATUS
IF %M%==2 GOTO ADD
IF %M%==3 GOTO RESET
IF %M%==4 GOTO COMMIT
IF %M%==5 GOTO CLONEM
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

:CLONEM
CLS
ECHO.
ECHO ---CLONE---
ECHO.
ECHO 1 - new
ECHO.
ECHO -- -- -- --
ECHO.
ECHO 2 - Milk2d
ECHO 3 - Website
ECHO 4 - Gittool
ECHO.
ECHO -- -- -- --
ECHO.
ECHO 5 - back
ECHO.
ECHO -- -- -- --
ECHO.
SET /P M= ~ 
IF %M%==1 GOTO CLONE
IF %M%==2 GOTO MILK2D
IF %M%==3 GOTO WEBSITE
IF %M%==4 GOTO GITTOOL
IF %M%==5 GOTO MENU

:MILK2D
CLS
ECHO.
ECHO --MILK 2D--
ECHO.
SET /p FOL= folder: 
ECHO.
ECHO -- -- -- -- --
ECHO.
ECHO -- -- -- --
ECHO.
git clone https://github.com/AustinLoudermilk/Milk2d %FOL%
ECHO.
ECHO -- -- -- --
ECHO.
pause >nul
GOTO MENU

:WEBSITE
CLS
ECHO.
ECHO --WEBSITE--
ECHO.
SET /p FOL= folder: 
ECHO.
ECHO -- -- -- -- --
ECHO.
git clone https://github.com/AustinLoudermilk/website %FOL%
ECHO.
ECHO -- -- -- --
ECHO.
pause >nul
GOTO MENU

:GITTOOL
CLS
ECHO.
ECHO --GITTOOL--
ECHO.
SET /p FOL= folder: 
ECHO.
ECHO -- -- -- -- --
ECHO.
git clone https://github.com/AustinLoudermilk/gittool %FOL%
ECHO.
ECHO -- -- -- --
ECHO.
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