using Microsoft.AspNetCore.Mvc;
using Reporte.WebApi.Channels;
using Reporte.WebApi.Models.DTO;
using Reporte.WebApi.Models.Reports;

namespace Reporte.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportesController(ReportChannel reportChannel) : ControllerBase
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
    }
}
