$artifactPath = "artifacts"
$packageOutputPath = $artifactPath
$configurationdefault = "Release"

$configuration = Read-Host 'Configuration to build [default: Release] ?'
if (!$configuration -or ($configuration -eq '')) {
	$configuration = $configurationdefault
}

Remove-Item "$packageOutputPath\*" -Recurse -ErrorAction Ignore

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
$nugetVersion = $version.SemVer
Write-Host "assemblyVersion: "$assemblyVersion
Write-Host "assemblyFileVersion: "$assemblyFileVersion
Write-Host "assemblyInformationalVersion: "$assemblyInformationalVersion
Write-Host "nugetVersion: "$nugetVersion

# Restore and Build
Write-Host "Building: "$nugetVersion
dotnet restore "./src/Mammoth.BigBrother.sln" --verbosity m
dotnet build "./src/Mammoth.BigBrother.sln" -c $configuration --no-restore /p:AssemblyVersion=$assemblyVersion /p:FileVersion=$assemblyFileVersion /p:InformationalVersion=$assemblyInformationalVersion

# NuGet Packages
Write-Host "NuGet Packages creation"
dotnet pack ".\src\Mammoth.BigBrother.Monitoring\Mammoth.BigBrother.Monitoring.csproj" -c $configuration --no-build -o $packageOutputPath /p:PackageVersion=$nugetVersion
dotnet pack ".\src\Mammoth.BigBrother.Akka.Monitoring\Mammoth.BigBrother.Akka.Monitoring.csproj" -c $configuration --no-build -o $packageOutputPath /p:PackageVersion=$nugetVersion
dotnet pack ".\src\Mammoth.BigBrother.Monitoring.Endpoint\Mammoth.BigBrother.Monitoring.Endpoint.csproj" -c $configuration --no-build -o $packageOutputPath /p:PackageVersion=$nugetVersion

Write-Host "Operation completed."

Read-Host