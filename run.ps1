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

& $msBuild ".\src" /t:restore /m
& $msBuild ".\src" /t:build /m
& Start-Process dotnet ".\src\Samples\Frontend\bin\Debug\netcoreapp2.2\Frontend.dll"
& Start-Process dotnet ".\src\Samples\Frontend\bin\Debug\netcoreapp3.1\Frontend.dll"
& Start-Process dotnet ".\src\Samples\Frontend\bin\Debug\net5.0\Frontend.dll"
& Start-Process "C:\Work\BigBrother\src\Samples\Frontend.net45\bin\Debug\Frontend.net45.exe"
& Start-Process dotnet "run --no-restore --no-build --project .\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj"

#Write-Host "Operation completed."

#Read-Host
