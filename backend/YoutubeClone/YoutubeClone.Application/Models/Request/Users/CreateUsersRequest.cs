using System.ComponentModel.DataAnnotations;
using YoutubeClone.Shared.Constants;

namespace YoutubeClone.Application.Models.Request.Users
{
    public class CreateUsersRequest
    {
        //atributo userName
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(150, ErrorMessage = ValidationConstants.MAX_LENGHT)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string UserName { get; set; } = null!;

        //atributo displayName
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(50, ErrorMessage = ValidationConstants.REQUIRED)]
        [MinLength(3, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string DisplayName { get; set; } = null!;

        //atributo email
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(255, ErrorMessage = ValidationConstants.REQUIRED)]
        [EmailAddress(ErrorMessage = ValidationConstants.EMAIL)]
        public string Email { get; set; } = null!;

        //atributo birthDate
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public DateOnly BirthDate { get; set; }

        //atributo country
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(30, ErrorMessage = ValidationConstants.REQUIRED)]
        [MinLength(4, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string Country { get; set; } = null!;

        //atributo password
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(20, ErrorMessage = ValidationConstants.REQUIRED)]
        [MinLength(8, ErrorMessage = ValidationConstants.MIN_LENGHT)]
        public string Password { get; set; } = null!;
    }
}
