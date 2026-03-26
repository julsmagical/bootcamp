namespace TalentInsights.Application.Models.DTOs
{
    public class CollaboratorDTO
    {
        public Guid CollaboratorId { get; set; }
        public string FullName { get; set; } = null!; //obligatorio
        public string? GitlabProfile { get; set; } //puede ser null
        public string Position { get; set; } = null!; //obligatorio
        public DateTime JoinedAt { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
