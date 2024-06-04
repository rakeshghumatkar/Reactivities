using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate Next;
        private readonly ILogger<ExceptionMiddleware> _logger ;

        private readonly IHostEnvironment env ;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment environment)
        {
            _logger = logger;
            Next = next;
            env = environment;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                // setting the json formate
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var response = env.IsDevelopment()? 
                    new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()):
                    new AppException(context.Response.StatusCode, "Internal Server Error");
                
                // setting the json formate
                var option =  new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, option);

                await context.Response.WriteAsync(json);
            }

        }
    }
}