# Run as Non Admin user in .net 4.5

Use netsh to register the URLs for both HTTP and HTTPS. 

If you plan to expose the endpoint on port 5003, open up a Console or a Powershell with administrative rights and write something like:

	netsh http add urlacl url=http://+:5003/ user=Everyone