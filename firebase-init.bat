@echo off
REM Firebase Project Initialization Script
echo ========================================
echo Firebase Project Setup
echo ========================================
echo.
echo This will help you connect to your Firebase project
echo.
echo IMPORTANT: When prompted, answer:
echo   - Features: Press SPACEBAR on "Hosting", then ENTER
echo   - Project: Choose "Use existing project"
echo   - Which project: Select YOUR project name
echo   - Public directory: Type "dist"
echo   - Single-page app: Type "Y"
echo   - GitHub: Type "N"
echo.
echo Starting Firebase init...
echo.

npx firebase-tools init

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Firebase init failed
    echo.
    echo Make sure you are logged in first!
    echo Run: firebase-login.bat
    echo.
) else (
    echo.
    echo ========================================
    echo SUCCESS! Firebase project connected!
    echo ========================================
    echo.
    echo Next step: Double-click deploy.bat
    echo.
)

pause
