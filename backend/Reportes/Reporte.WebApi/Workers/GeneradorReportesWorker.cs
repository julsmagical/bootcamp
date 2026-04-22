using Microsoft.AspNetCore.SignalR;
using Reporte.WebApi.Channels;
using Reporte.WebApi.Classes;
using Reporte.WebApi.Hubs;
using Reporte.WebApi.Models.DTO;

namespace Reporte.WebApi.Workers
{
    public class GeneradorReportesWorker(ReportChannel channel, Cache<OrderDTO> cache, IHubContext<OrderHub> orderHubContext) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await foreach (var order in channel.ReadAllAsync(stoppingToken))
            {
                order.Status = "Generando";
                cache.Update(order.Id.ToString(), order);
                Console.WriteLine($"{order.Id} -> {order.Name} -> {order.Tipo} -> {order.Status}");

                orderHubContext.Clients.All.SendAsync("OrderStatusUpdated", order);
                await Task.Delay(5000, stoppingToken);

                order.Status = "En proceso de bodega";
                cache.Update(order.Id.ToString(), order);
                Console.WriteLine($"{order.Id} -> {order.Name} -> {order.Tipo} -> {order.Status}");
                orderHubContext.Clients.All.SendAsync("OrderStatusUpdated", order);

                await Task.Delay(5000, stoppingToken);

                order.Status = "Generado";
                cache.Update(order.Id.ToString(), order);
                Console.WriteLine($"{order.Id} -> {order.Name} -> {order.Tipo} -> {order.Status}");
                orderHubContext.Clients.All.SendAsync("OrderStatusUpdated", order);

            }
        }

    }
}
