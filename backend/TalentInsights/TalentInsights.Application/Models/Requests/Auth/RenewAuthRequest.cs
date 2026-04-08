using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TalentInsights.Application.Models.Requests.Auth
{
    public class RenewAuthRequest
    {
        [Required]
        [Description("Token que se usa para renovar la sesion. Este se consigue, al iniciar la sesion en el aplicativo")]
        public string RefreshToken { get; set; } = null!;
    }
}
