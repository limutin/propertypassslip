@echo off
REM Firebase Login Script
echo ========================================
echo Firebase Authentication
echo ========================================
echo.
echo This will open your browser to login to Firebase
echo.
echo Please wait while we start Firebase tools...
echo.

npx firebase-tools login

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Firebase login failed
    echo.
    echo Try this instead:
    echo 1. Open Command Prompt in this folder
    echo 2. Type: npx firebase-tools login
    echo 3. Press Enter
    echo.
) else (
    echo.
    echo ========================================
    echo SUCCESS! You are logged in!
    echo ========================================
    echo.
    echo Next step: Double-click firebase-init.bat
    echo.
)

pause
