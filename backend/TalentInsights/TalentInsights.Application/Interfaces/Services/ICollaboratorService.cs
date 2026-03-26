using TalentInsights.Application.Models.DTOs;
using TalentInsights.Application.Models.Requests.Collaborator;
using TalentInsights.Application.Models.Responses;

namespace TalentInsights.Application.Interfaces.Services
{
    public interface ICollaboratorService
    {
        public GenericResponse<CollaboratorDTO> Create(CreateCollaboratorRequest model);
        public GenericResponse<List<CollaboratorDTO>> Get(int limit, int offset);
        public GenericResponse<CollaboratorDTO?> Get(Guid collaboratorId);
        public GenericResponse<bool> Delete(Guid collaboratorId);
    }
}
