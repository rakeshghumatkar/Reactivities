using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        private IMediator _mediator ;

        protected IMediator Mediator =>_mediator??= 
            HttpContext.RequestServices.GetService<IMediator>() ;

        protected ActionResult HandleResult<T> (Result<T> results)
        {
            if (results == null)
                return NotFound();
            else if (results.IsSuccess && results.Value != null)
                return Ok(results.Value);
            else if (results.IsSuccess && results.Value == null)
                return NotFound();
            else
                return BadRequest(results.Error);
        }
    }
}