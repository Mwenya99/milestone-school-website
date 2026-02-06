@echo off
REM Batch script to start a local web server for Milestone School Website
REM This script will try multiple methods to start a local server
REM Server will be accessible on localhost and on your local network

echo ========================================
echo  Milestone School - Local Server
echo ========================================
echo.

REM Set the port (default: 8000)
set PORT=8000
set HOST=0.0.0.0
set URL=http://localhost:%PORT%

REM Get local IP address for mobile access
echo [INFO] Detecting your local IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set LOCAL_IP=%%a
    goto :ip_found
)
:ip_found
set LOCAL_IP=%LOCAL_IP: =%
if "%LOCAL_IP%"=="" (
    echo [WARNING] Could not detect local IP address automatically.
    echo Please check your IP address manually using: ipconfig
    set LOCAL_IP=YOUR_IP_HERE
)

REM Check if port is already in use
netstat -an | findstr ":%PORT%" >nul
if %errorlevel% == 0 (
    echo [WARNING] Port %PORT% is already in use!
    echo Please close the application using port %PORT% or change the PORT variable.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Server Information
echo ========================================
echo Local access:  %URL%
echo Network access: http://%LOCAL_IP%:%PORT%
echo.
echo To access from mobile device:
echo   1. Make sure your mobile device is on the same Wi-Fi network
echo   2. Open browser on mobile and go to: http://%LOCAL_IP%:%PORT%
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Method 1: Try Python's http.server (Python 3)
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [INFO] Using Python HTTP Server...
    echo [INFO] Server accessible at: http://%LOCAL_IP%:%PORT%
    echo.
    start "" "%URL%"
    timeout /t 2 /nobreak >nul
    python -m http.server %PORT% --bind %HOST%
    goto :end
)

REM Method 2: Try Python 2 (if Python 3 not available)
REM Note: Python 2 SimpleHTTPServer doesn't support binding to 0.0.0.0 easily
REM It will still work on localhost, but network access may be limited
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo [INFO] Using Python 2 HTTP Server...
    echo [WARNING] Python 2 may have limited network access
    echo [INFO] Server accessible at: http://%LOCAL_IP%:%PORT%
    echo.
    start "" "%URL%"
    timeout /t 2 /nobreak >nul
    python2 -m SimpleHTTPServer %PORT%
    goto :end
)

REM Method 3: Try Node.js http-server (if installed globally)
where http-server >nul 2>&1
if %errorlevel% == 0 (
    echo [INFO] Using Node.js http-server...
    echo [INFO] Server accessible at: http://%LOCAL_IP%:%PORT%
    echo.
    start "" "%URL%"
    timeout /t 2 /nobreak >nul
    http-server -p %PORT% -a %HOST% -o
    goto :end
)

REM Method 4: Try npx http-server (no global install needed)
where node >nul 2>&1
if %errorlevel% == 0 (
    echo [INFO] Using npx http-server (Node.js detected)...
    echo [INFO] Server accessible at: http://%LOCAL_IP%:%PORT%
    echo.
    start "" "%URL%"
    timeout /t 2 /nobreak >nul
    npx --yes http-server -p %PORT% -a %HOST% -o
    goto :end
)

REM Method 5: Try PHP built-in server
where php >nul 2>&1
if %errorlevel% == 0 (
    echo [INFO] Using PHP built-in server...
    echo [INFO] Server accessible at: http://%LOCAL_IP%:%PORT%
    echo.
    start "" "%URL%"
    timeout /t 2 /nobreak >nul
    php -S %HOST%:%PORT%
    goto :end
)

REM If no method works, show error message
echo [ERROR] No suitable web server found!
echo.
echo Please install one of the following:
echo   1. Python 3 (recommended): https://www.python.org/downloads/
echo   2. Node.js: https://nodejs.org/
echo   3. PHP: https://www.php.net/downloads.php
echo.
echo Or use a simple alternative:
echo   - Live Server extension in VS Code
echo   - XAMPP, WAMP, or MAMP
echo.
pause
exit /b 1

:end
echo.
echo Server stopped.
pause
