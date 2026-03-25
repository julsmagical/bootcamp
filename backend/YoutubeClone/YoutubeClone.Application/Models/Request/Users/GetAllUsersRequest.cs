namespace YoutubeClone.Application.Models.Request.Users
{
    public class GetAllUsersRequest
    {
        public int Limit { get; set; }
        public int Offset { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
    }
}
