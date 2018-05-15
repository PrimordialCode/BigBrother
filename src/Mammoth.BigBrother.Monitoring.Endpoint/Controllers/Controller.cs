using System;
using System.Collections.Generic;
using System.Text;
#if NET45
using System.Web.Http;
#endif


namespace Mammoth.BigBrother.Monitoring.Endpoint.Controllers
{
#if NET45
    public abstract class Controller : ApiController
    {
    }
#endif
}
