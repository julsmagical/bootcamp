using Microsoft.AspNetCore.SignalR;

namespace Reporte.WebApi.Hubs
{
    public class OrderHub : Hub
    {
        public void Hello(string message)
        {
            Console.WriteLine(message);
        }
    }
}
