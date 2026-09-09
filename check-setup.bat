@echo off
REM PropertyPassSlip Setup Checker
echo ========================================
echo PropertyPassSlip Setup Check
echo ========================================
echo.

echo Checking Node.js...
call node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Install from https://nodejs.org/
    goto :error
)
echo OK: Node.js is installed
echo.

echo Checking npm...
call npm --version
if %errorlevel% neq 0 (
    echo ERROR: npm not found
    goto :error
)
echo OK: npm is installed
echo.

echo Checking Firebase Tools...
call npx firebase-tools --version
if %errorlevel% neq 0 (
    echo ERROR: Cannot run Firebase tools
    goto :error
)
echo OK: Firebase tools available
echo.

echo Checking if logged in to Firebase...
call npx firebase-tools projects:list >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Not logged in to Firebase
    echo Run: firebase-login.bat
) else (
    echo OK: Logged in to Firebase
)
echo.

echo Checking for .firebaserc...
if exist .firebaserc (
    echo OK: Firebase project configured
) else (
    echo WARNING: Firebase project not initialized
    echo Run: firebase-init.bat
)
echo.

echo Checking for node_modules...
if exist node_modules (
    echo OK: Dependencies installed
) else (
    echo WARNING: Dependencies not installed
    echo Run: npm install
)
echo.

echo Checking firebase.json...
if exist firebase.json (
    echo OK: Firebase configuration exists
) else (
    echo ERROR: firebase.json not found
)
echo.

echo ========================================
echo Setup Check Complete
echo ========================================
echo.
echo Next steps:
echo 1. If not logged in: Run firebase-login.bat
echo 2. If not initialized: Run firebase-init.bat
echo 3. Update src/firebase/config.js with your Firebase credentials
echo 4. Run: deploy.bat
echo.
goto :end

:error
echo.
echo ========================================
echo Setup is incomplete
echo ========================================
echo Please fix the errors above before deploying.
echo.

:end
pause
