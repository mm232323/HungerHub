@echo off
REM Create catch-all route directory and file

setlocal enabledelayedexpansion
set "CLIENT_DIR=%~dp0"
set "CATCHALL_DIR=%CLIENT_DIR%app\[locale]\[...slug]"

if not exist "!CATCHALL_DIR!" mkdir "!CATCHALL_DIR!"

(
echo import { notFound } from "next/navigation";
echo.
echo /**
echo  * Catch-all route for undefined pages
echo  * This triggers the not-found.tsx page for any route that doesn't match existing pages
echo  */
echo export default function CatchAllRoute(^) {
echo   notFound(^);
echo }
) > "!CATCHALL_DIR!\page.tsx"

echo ✓ Catch-all route created successfully at: !CATCHALL_DIR!\page.tsx
pause
