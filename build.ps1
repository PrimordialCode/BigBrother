function Resolve-MsBuild {
	$msb2017 = Resolve-Path "${env:ProgramFiles(x86)}\Microsoft Visual Studio\*\*\MSBuild\*\bin\msbuild.exe" -ErrorAction SilentlyContinue
	if($msb2017) {
		Write-Host "Found MSBuild 2017 (or later)."
		Write-Host $msb2017
		return $msb2017
	}

	$msBuild2015 = "${env:ProgramFiles(x86)}\MSBuild\14.0\bin\msbuild.exe"

	if(-not (Test-Path $msBuild2015)) {
		throw 'Could not find MSBuild 2015 or later.'
	}

	Write-Host "Found MSBuild 2015."
	Write-Host $msBuild2015

	return $msBuild2015
}

$msBuild = Resolve-MsBuild

$artifactPath = "artifacts"
$packageOutputPath = "..\..\$artifactPath"
$configurationdefault = "Release"

$configuration = Read-Host 'Configuration to build [default: Release] ?'
if (!$configuration -or ($configuration -eq '')) {
	$configuration = $configurationdefault
}

Remove-Item ".\$artifactPath\*" -Recurse -ErrorAction Ignore

& $msBuild ".\src" /t:restore /p:Configuration=$configuration
& $msBuild ".\src" /t:build /p:Configuration=$configuration
# todo: run tests
& $msBuild ".\src\Mammoth.BigBrother.Monitoring\Mammoth.BigBrother.Monitoring.csproj" /t:pack /p:PackageOutputPath=$packageOutputPath
& $msBuild ".\src\Mammoth.BigBrother.Akka.Monitoring\Mammoth.BigBrother.Akka.Monitoring.csproj" /t:pack /p:PackageOutputPath=$packageOutputPath
& $msBuild ".\src\Mammoth.BigBrother.Monitoring.Endpoint\Mammoth.BigBrother.Monitoring.Endpoint.csproj" /t:pack /p:PackageOutputPath=$packageOutputPath

Write-Host "Operation completed."

Read-Host
