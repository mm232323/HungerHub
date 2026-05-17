$client = "C:\Users\hp\Downloads\Design-Note-Check\Design-Note-Check\foodik\client"
$srcComp = "C:\Users\hp\Downloads\Design-Note-Check\Design-Note-Check\artifacts\foodhub\src\components"
$srcPages = "C:\Users\hp\Downloads\Design-Note-Check\Design-Note-Check\artifacts\foodhub\src\pages"

# Remove old src folder if present
Remove-Item -Recurse -Force "$client\src" -ErrorAction SilentlyContinue

# Ensure shared/components folder exists
$sharedComp = "$client\shared\components"
New-Item -ItemType Directory -Force -Path $sharedComp | Out-Null

# Copy all component files to shared/components
Copy-Item -Path "$srcComp\*" -Destination $sharedComp -Recurse -Force

# Ensure app folder exists
$appRoot = "$client\app"
New-Item -ItemType Directory -Force -Path $appRoot | Out-Null

# Copy each page .tsx into its own folder with page.tsx
Get-ChildItem -Path $srcPages -Recurse -Filter *.tsx | ForEach-Object {
    $relativeDir = $_.DirectoryName.Substring($srcPages.Length).TrimStart('\\')
    $pageName = $_.BaseName
    if ($relativeDir) {
        $destFolder = Join-Path $appRoot (Join-Path $relativeDir $pageName)
    } else {
        $destFolder = Join-Path $appRoot $pageName
    }
    New-Item -ItemType Directory -Force -Path $destFolder | Out-Null
    Copy-Item -Path $_.FullName -Destination (Join-Path $destFolder "page.tsx") -Force
}
