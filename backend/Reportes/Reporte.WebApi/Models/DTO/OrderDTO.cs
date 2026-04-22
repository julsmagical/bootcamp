namespace Reporte.WebApi.Models.DTO
{
    public class OrderDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Tipo { get; set; } = null!;
        public string Status { get; set; } = "Sin generar";

    }
}
