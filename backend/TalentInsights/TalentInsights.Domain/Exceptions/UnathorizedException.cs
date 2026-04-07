namespace TalentInsights.Domain.Exceptions
{
    public class UnathorizedException : Exception
    {
        public UnathorizedException(string message) : base(message)
        {

        }
    }
}
