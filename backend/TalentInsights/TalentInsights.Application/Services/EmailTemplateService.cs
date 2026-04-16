namespace TalentInsights.Application.Services
{
    /*public class EmailTemplateService (EmailTemplateData data, IEmailTemplateRepository repository) : IEmailTemplateService
    {
        public Task<EmailTemplateDto> Get(string name, Dictionary<string, string> variables)
        {
            var template = data.Data.First(x => x.Name == name);

            foreach(var variable in variables)
            {
                template.Body = template.Body.Replace("{{" + variable.Key + "}}", variable.Value);
            }
            return new EmailTemplateDto
            {
                Body = template.Body,
            };
        }

    public Task<EmailTemplateDto> Get(string name)
        {
            throw new NotImplementedException();
        }

        public Task Init()
        {
            throw new NotImplementedException();
        }

        public Task Restart()
        {
            throw new NotImplementedException();
        }
    }*/
}
