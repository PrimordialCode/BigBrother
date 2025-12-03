# Save and set GITHUB_ACTIONS and TF_BUILD for the duration of the script
$prevGithubActions = $null
if ($env:GITHUB_ACTIONS -ne $null) {
	$prevGithubActions = $env:GITHUB_ACTIONS
}
$prevTfBuild = $null
if ($env:TF_BUILD -ne $null) {
	$prevTfBuild = $env:TF_BUILD
}

# Ensure MSBuild treats this as a CI build
$env:GITHUB_ACTIONS = 'true'
$env:TF_BUILD = 'true'

try {
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
	$sourceRevisionId = $version.Sha
	Write-Host "assemblyVersion: "$assemblyVersion
	Write-Host "assemblyFileVersion: "$assemblyFileVersion
	Write-Host "assemblyInformationalVersion: "$assemblyInformationalVersion
	Write-Host "nugetVersion: "$nugetVersion
	Write-Host "sourceRevisionId: "$sourceRevisionId

	# Restore and Build (force CI-related MSBuild properties to make the build deterministic)
	Write-Host "Building: "$nugetVersion
	dotnet restore "./src/Mammoth.BigBrother.sln" --verbosity m
	dotnet build "./src/Mammoth.BigBrother.sln" -c $configuration --no-restore `
		/p:AssemblyVersion=$assemblyVersion `
		/p:FileVersion=$assemblyFileVersion `
		/p:InformationalVersion=$assemblyInformationalVersion `
		/p:ContinuousIntegrationBuild=true `
		/p:Deterministic=true `
		/p:SourceRevisionId=$sourceRevisionId

	# NuGet Packages (pass the same CI/deterministic properties and the commit id)
	Write-Host "NuGet Packages creation"
	dotnet pack ".\src\Mammoth.BigBrother.Monitoring\Mammoth.BigBrother.Monitoring.csproj" -c $configuration --no-build -o $packageOutputPath /p:PackageVersion=$nugetVersion /p:ContinuousIntegrationBuild=true /p:Deterministic=true /p:SourceRevisionId=$sourceRevisionId
	dotnet pack ".\src\Mammoth.BigBrother.Akka.Monitoring\Mammoth.BigBrother.Akka.Monitoring.csproj" -c $configuration --no-build -o $packageOutputPath /p:PackageVersion=$nugetVersion /p:ContinuousIntegrationBuild=true /p:Deterministic=true /p:SourceRevisionId=$sourceRevisionId
	dotnet pack ".\src\Mammoth.BigBrother.Monitoring.Endpoint\Mammoth.BigBrother.Monitoring.Endpoint.csproj" -c $configuration --no-build -o $packageOutputPath /p:PackageVersion=$nugetVersion /p:ContinuousIntegrationBuild=true /p:Deterministic=true /p:SourceRevisionId=$sourceRevisionId

	Write-Host "Operation completed."

	Read-Host
}
finally {
	# Restore original GITHUB_ACTIONS value (or remove it if it didn't exist)
	if ($prevGithubActions -ne $null) {
		$env:GITHUB_ACTIONS = $prevGithubActions
		Write-Host "GITHUB_ACTIONS restored to previous value."
	}
	else {
		Remove-Item Env:GITHUB_ACTIONS -ErrorAction SilentlyContinue
		Write-Host "GITHUB_ACTIONS removed (was not set before)."
	}

	# Restore original TF_BUILD value (or remove it if it didn't exist)
	if ($prevTfBuild -ne $null) {
		$env:TF_BUILD = $prevTfBuild
		Write-Host "TF_BUILD restored to previous value."
	}
	else {
		Remove-Item Env:TF_BUILD -ErrorAction SilentlyContinue
		Write-Host "TF_BUILD removed (was not set before)."
	}
}