@echo off
REM Simple batch script to start local server (Python only)
REM This is a simpler version that only uses Python
REM Server will be accessible on localhost and on your local network

echo ========================================
echo  Milestone School - Local Server
echo ========================================
echo.

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

REM Try Python 3 first
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

REM Try Python 2
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

echo [ERROR] Python is not installed!
echo Please install Python from https://www.python.org/downloads/
echo.
pause
exit /b 1

:end
pause
