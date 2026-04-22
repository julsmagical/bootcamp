using Reporte.WebApi.Channels;

namespace Reporte.WebApi.Workers
{
    public class GeneradorReportesWorker(ReportChannel channel) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await foreach (var order in channel.ReadAllAsync(stoppingToken))
            {
                order.Status = "Generando";
                Console.WriteLine($"{order.Id} -> {order.Name} -> {order.Tipo} -> {order.Status}");
                await Task.Delay(3000, stoppingToken);

                order.Status = "En proceso de bodega";
                Console.WriteLine($"{order.Id} -> {order.Name} -> {order.Tipo} -> {order.Status}");
                await Task.Delay(3000, stoppingToken);

                order.Status = "Generado";
                Console.WriteLine($"{order.Id} -> {order.Name} -> {order.Tipo} -> {order.Status}");

            }
        }

    }
}
