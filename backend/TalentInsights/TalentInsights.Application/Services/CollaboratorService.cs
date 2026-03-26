using TalentInsights.Application.Helpers;
using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.DTOs;
using TalentInsights.Application.Models.Requests.Collaborator;
using TalentInsights.Application.Models.Responses;
using TalentInsights.Shared.Helpers;

namespace TalentInsights.Application.Services
{
    public class CollaboratorService : ICollaboratorService
    {
        public GenericResponse<CollaboratorDTO> Create(CreateCollaboratorRequest model)
        {
            var collaborator = new CollaboratorDTO
            {
                CollaboratorId = Guid.NewGuid(),
                FullName = model.FullName,
                GitlabProfile = model.GitlabProfile,
                Position = model.Position,
                CreatedAt = DateTimeHelper.UtcNow(),
                JoinedAt = DateTimeHelper.UtcNow(),
            };
            return ResponseHelper.Create(collaborator);
        }
        public GenericResponse<bool> Delete(Guid collaboratorId)
        {
            throw new NotImplementedException();
        }
        public GenericResponse<List<CollaboratorDTO>> Get(int limit, int offset)
        {
            throw new NotImplementedException();
        }
        public GenericResponse<CollaboratorDTO?> Get(Guid collaboratorId)
        {
            throw new NotImplementedException();
        }

        /*public GenericResponse<CollaboratorDTO> Update(Guid collaboratorId, UpdateCollaboratorRequest model)
        {
            throw new NotImplementedException();
        }*/
    }
}
