dotnet restore "./src/Mammoth.BigBrother.sln" --verbosity m
dotnet build "./src/Mammoth.BigBrother.sln" -c "Debug" --no-restore /p:AssemblyVersion=$assemblyVersion /p:FileVersion=$assemblyFileVersion /p:InformationalVersion=$assemblyInformationalVersion

& Start-Process dotnet ".\src\Samples\Frontend\bin\Debug\netcoreapp2.2\Frontend.2.2.dll"
& Start-Process dotnet ".\src\Samples\Frontend\bin\Debug\netcoreapp3.1\Frontend.3.1.dll"
& Start-Process dotnet ".\src\Samples\Frontend\bin\Debug\net5.0\Frontend.5.0.dll"
& Start-Process ".\src\Samples\Frontend.net45\bin\Debug\Frontend.net45.exe"
& Start-Process dotnet "run --no-build --project .\src\Mammoth.BigBrother.Ui\Mammoth.BigBrother.Ui.csproj"

#Write-Host "Operation completed."

#Read-Host
