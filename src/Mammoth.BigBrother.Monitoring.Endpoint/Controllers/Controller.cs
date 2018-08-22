using System;
using System.Collections.Generic;
using System.Text;
#if NET45
using System.Web.Http;
#endif

#pragma warning disable S3261 // Namespaces should not be empty
namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
#if NET45
    public abstract class Controller : ApiController
    {
    }
#endif
}
#pragma warning restore S3261 // Namespaces should not be empty
