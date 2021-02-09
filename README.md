# Introduction 

An Application Dashboard and Probes that can be injected into you main code to gather some metrics.

Some gauges and probes are specificaly designed to work with and inpect Actors Frameworks.

# Warning

The project is in a very early stage of development, it's highly unstable and needs a lot of cleanup and it's absolutely not Production Ready.

USE IT AT YOUR OWN RISK.

# Run the application with the demo project

Steps to follow to run the application in develop mode:

1- Open up the UI project in VSCode .\src\Mammoth.BigBrother.Ui\Ui).

2- Compile the application with: npm run buildwatch.

3- Compile and run the C# UI Host application (Mammoth.BigBrother.Ui) and the demo app (Frontend).

# Publish the Applications

Each project will build its very own NuGet package to be deployed.

To build the front-end application:

1- Compile the Angular application in production mode: ng build --prod

2- Publish the Web Application.

# Information / Port Mappings

localhost:5001 - BigBrother UI
localhost:5002 - Frontend net461
localhost:5003 - Frontend netcoreapp2.2
localhost:5004 - Frontend netcoreapp3.1
localhost:5005 - Frontend net5.0


# debugging / running locally in non admin mode

To debug or run the test application locally in non-admin mode you need to grant permissions to the URLs involved:

```
netsh http add urlacl url=http://+:80/MyUri user=DOMAIN\user
```

like so:

```
netsh http add urlacl url=http://+:5001 user=DOMAIN\user
netsh http add urlacl url=http://+:5002 user=DOMAIN\user
netsh http add urlacl url=http://+:5003 user=DOMAIN\user
netsh http add urlacl url=http://+:5004 user=DOMAIN\user
netsh http add urlacl url=http://+:5005 user=DOMAIN\user
```

if you have already reseved URLs the you fiorst need to delete them:

```
netsh http delete urlacl url=http://+:80/MyUri
```