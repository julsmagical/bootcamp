using Microsoft.AspNetCore.Mvc;
using Reporte.WebApi.Channels;
using Reporte.WebApi.Classes;
using Reporte.WebApi.Models.DTO;
using Reporte.WebApi.Models.Reports;

namespace Reporte.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportesController(ReportChannel reportChannel, Cache<OrderDTO> cache) : ControllerBase
    {
        [HttpPost("crear")]
        public async Task<IActionResult> Crear(CreateReportRequest model)
        {
            var newOrder = new OrderDTO
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Tipo = model.Tipo,
            };

            await reportChannel.PublishAsync(newOrder);
            return Ok(newOrder);
        }

        [HttpGet("consultar/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var order = cache.Get(id.ToString());
            return Ok(order);
        }
    }
}
