@echo off
REM PropertyPassSlip Firebase Deployment Script
echo ========================================
echo PropertyPassSlip Firebase Deployment
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo Step 2: Building production version...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo.

echo Step 3: Deploying to Firebase...
call npx firebase-tools deploy --only hosting
if %errorlevel% neq 0 (
    echo ERROR: Deployment failed
    echo Make sure you're logged in with: npx firebase-tools login
    pause
    exit /b 1
)
echo.

echo ========================================
echo Deployment Complete!
echo ========================================
echo Your site is now live!
echo Check the URL above to view your site.
echo.
pause
