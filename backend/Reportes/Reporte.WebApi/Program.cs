using Reporte.WebApi.Channels;
using Reporte.WebApi.Classes;
using Reporte.WebApi.Hubs;
using Reporte.WebApi.Models.DTO;
using Reporte.WebApi.Workers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Canales
builder.Services.AddSingleton<ReportChannel>();

// Cache
builder.Services.AddSingleton<Cache<OrderDTO>>();

// Agregar worker
builder.Services.AddHostedService<GeneradorReportesWorker>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("Frontend");

app.MapHub<OrderHub>("/hub/order");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
