using System.ComponentModel.DataAnnotations;

namespace Reporte.WebApi.Models.Reports
{
    public class CreateReportRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Tipo { get; set; }
    }
}
