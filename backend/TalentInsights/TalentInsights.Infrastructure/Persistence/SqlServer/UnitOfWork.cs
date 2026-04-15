using TalentInsights.Domain.Database.SqlServer;
using TalentInsights.Domain.Database.SqlServer.Context;
using TalentInsights.Domain.Interfaces.Repositories;

namespace TalentInsights.Infrastructure.Persistence.SqlServer
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TalentInsightsContext _context;

        public ICollaboratorRepository collaboratorRepository { get; set; }

        public UnitOfWork(TalentInsightsContext context, ICollaboratorRepository collaboratorsRepository)
        {
            _context = context;
            collaboratorRepository = collaboratorsRepository;
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
