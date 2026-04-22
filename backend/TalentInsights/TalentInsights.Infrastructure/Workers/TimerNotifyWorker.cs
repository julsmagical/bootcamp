using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TalentInsights.Domain.Interfaces.Repositories;
using TalentInsights.Shared;

namespace TalentInsights.Infrastructure.Workers
{
    public class TimerNotifyWorker(IServiceScopeFactory serviceScopeFactory, SMTP smtp) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var timer = new PeriodicTimer(TimeSpan.FromSeconds(7));

            while (!stoppingToken.IsCancellationRequested)
            {
                var scope = serviceScopeFactory.CreateScope();
                var collaboratorRepository = scope.ServiceProvider.GetRequiredService<ICollaboratorRepository>();

                var collaborators = collaboratorRepository.Queryable().ToList();

                foreach (var collaborator in collaborators)
                {
                    if (collaborator.GitlabProfile is null)
                    {
                        Console.WriteLine($"{collaborator.Email} Crea una cuenta de Gitlab, ya!!");
                    }
                }

                Console.WriteLine($"Current time: {DateTime.Now}");
                await timer.WaitForNextTickAsync(stoppingToken);
            }
        }
    }
}
