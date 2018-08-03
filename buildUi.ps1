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

$artifactPath = ".\artifacts\ui"

Remove-Item "$artifactPath\*" -Recurse -ErrorAction Ignore

& $msBuild ".\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj" /t:restore
#& $msBuild ".\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj" /t:build

Set-Location ".\src\Mammoth.BigBrother.Ui\Ui"
npm install
npm run build
Set-Location "..\..\.."

# publish the app
& $msbuild ".\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj" /verbosity:normal /p:Configuration=Release /p:DeployOnBuild=true /p:PublishProfile=".\src\Mammoth.BigBrother.Ui\Properties\PublishProfiles\FolderProfile.pubxml"
Move-Item -Path ".\src\Mammoth.BigBrother.Ui\bin\publish\*" $artifactPath

Set-Content -Path "$artifactPath\run.cmd" -Value "dotnet Mammoth.BigBrother.Ui.dll"

Write-Host "Operation completed."

Read-Host
