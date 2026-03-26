using System.ComponentModel.DataAnnotations;
using TalentInsights.Shared.Constants;

namespace TalentInsights.Application.Models.Requests.Collaborator
{
    public class ChangePasswordCollaboratorRequest
    {
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public string OldPassword { get; set; } = null!;
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]

        public string NewPassword { get; set; } = null!;
    }
}
