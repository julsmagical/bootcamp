using System.Text;

namespace TalentInsights.Shared
{
    public static class Generate
    {
        private const string Characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        public static string RandomText(int lenght = 50)
        {
            var sb = new StringBuilder();
            var rnd = new Random();

            for (int i = 0; i < lenght; i++)
            {
                sb.Append(Characters[rnd.Next(0, Characters.Length - 1)]);
            }

            return sb.ToString();
        }
    }
}
