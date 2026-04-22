using Reporte.WebApi.Models.DTO;
using System.Threading.Channels;

namespace Reporte.WebApi.Channels
{
    public class ReportChannel
    {
        private readonly Channel<OrderDTO> _channel = Channel.CreateBounded<OrderDTO>(10);

        public ValueTask PublishAsync(OrderDTO order)
        {
            return _channel.Writer.WriteAsync(order);
        }

        public IAsyncEnumerable<OrderDTO> ReadAllAsync(CancellationToken cancellation)
        {
            return _channel.Reader.ReadAllAsync(cancellation);
        }
    }
}
