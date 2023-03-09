$artifactPath = ".\artifacts\ui\"
$configurationdefault = "Release"

$configuration = Read-Host 'Configuration to build [default: Release] ?'
if (!$configuration -or ($configuration -eq '')) {
	$configuration = $configurationdefault
}

Remove-Item "$artifactPath\*" -Recurse -ErrorAction Ignore

# Install gitversion tool
dotnet tool restore
$output = dotnet tool run dotnet-gitversion /nofetch | out-string

# GitVersion
Write-Host $output
$version = $output | ConvertFrom-Json
$assemblyVersion = $version.AssemblySemver
$assemblyFileVersion = $version.AssemblySemver
#$assemblyInformationalVersion = ($version.SemVer + "." + $version.Sha)
$assemblyInformationalVersion = ($version.InformationalVersion)
$nugetVersion = $version.NuGetVersion
Write-Host $assemblyVersion
Write-Host $assemblyFileVersion
Write-Host $assemblyInformationalVersion
Write-Host $nugetVersion

# Restore
Write-Host "Restore"
dotnet restore ".\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj" --verbosity m

write-Host "Build UI"
Set-Location ".\src\Mammoth.BigBrother.Ui\Ui"
npm ci --force
#npm audit fix
npm run build
Set-Location "..\..\.."

# Build and Publish the app
dotnet build ".\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj" -c $configuration --no-restore /p:AssemblyVersion=$assemblyVersion /p:FileVersion=$assemblyFileVersion /p:InformationalVersion=$assemblyInformationalVersion
dotnet publish ".\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj" --no-build /p:Configuration=$configuration /p:DeployOnBuild=true /p:PublishProfile=".\src\Mammoth.BigBrother.Ui\Properties\PublishProfiles\FolderProfile.pubxml"

Copy-Item -Path ".\src\Mammoth.BigBrother.Ui\bin\$configuration\net7.0\publish\*" -Destination $artifactPath -Recurse

Set-Content -Path "$artifactPath\run.cmd" -Value "dotnet Mammoth.BigBrother.Ui.dll"

Write-Host "Operation completed."

Read-Host