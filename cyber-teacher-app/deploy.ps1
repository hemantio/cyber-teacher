# Check if inside a git repository
if (-not (Test-Path ".git")) {
    Write-Error "Not a git repository. Please run this script from the root of your project."
    exit 1
}

# Ask for commit message
$commitMessage = Read-Host "Enter commit message (Press Enter for default 'Update')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

Write-Host "`n[1/3] Adding changes..." -ForegroundColor Cyan
git add .

Write-Host "`n[2/3] Committing changes..." -ForegroundColor Cyan
git commit -m "$commitMessage"

Write-Host "`n[3/3] Pushing to GitHub (Triggers Vercel Deployment)..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Success! Changes pushed to GitHub." -ForegroundColor Green
    Write-Host "Vercel should now be building your new version." -ForegroundColor Green
}
else {
    Write-Host "`n❌ Error: Push failed. Please check your git status." -ForegroundColor Red
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
