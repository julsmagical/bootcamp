using System.ComponentModel.DataAnnotations;
using YoutubeClone.Shared.Constants;

namespace YoutubeClone.Application.Models.Request.Users
{
    public class UpdateUsersRequest
    {
        //actualizar displayName
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(50, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(3, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string DisplayName { get; set; } = null!;

        //actualizar email
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [EmailAddress(ErrorMessage = ValidationConstants.EMAIL)]
        public string Email { get; set; } = null!;

        //actualizar country
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(30, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(4, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string Country { get; set; } = null!;
    }
}
