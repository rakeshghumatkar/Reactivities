using Microsoft.EntityFrameworkCore;
using Persistence;
using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);  //created the krestal server to host the application

//extension method
builder.Services.AddApplicationService(builder.Configuration);
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Enable CORS
app.UseCors("CorsPolicy");

app.MapControllers();


//Addiding SQL lite database 
using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try 
{
    var context = service.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = service.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"Error occure while migration");
}
app.Run();
