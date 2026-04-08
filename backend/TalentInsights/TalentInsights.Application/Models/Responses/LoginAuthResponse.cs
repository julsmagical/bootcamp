namespace TalentInsights.Application.Models.Responses
{
    public class LoginAuthResponse
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }

    }
}
