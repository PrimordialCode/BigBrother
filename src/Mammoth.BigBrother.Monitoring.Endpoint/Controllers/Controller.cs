using System;
using System.Collections.Generic;
using System.Text;
#if NET461
using System.Web.Http;
#endif
#if NET5_0
using Microsoft.AspNetCore.Mvc;
#endif

#pragma warning disable S3261 // Namespaces should not be empty
namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
#if NET461
    public abstract class Controller : ApiController
    {
    }
#endif
#if NET5_0
    public abstract class Controller : ControllerBase
    {
    }
#endif
}
#pragma warning restore S3261 // Namespaces should not be empty
