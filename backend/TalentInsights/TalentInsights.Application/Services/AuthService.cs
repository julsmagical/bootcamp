using Microsoft.Extensions.Configuration;
using TalentInsights.Application.Helpers;
using TalentInsights.Application.Interfaces;
using TalentInsights.Application.Models.Requests.Auth;
using TalentInsights.Application.Models.Responses;
using TalentInsights.Domain.Exceptions;
using TalentInsights.Domain.Interfaces.Repositories;
using TalentInsights.Shared;

namespace TalentInsights.Application.Services
{
    public class AuthService(ICollaboratorRepository collaboratorRepository, IConfiguration configuration) : IAuthService
    {
        public async Task<GenericResponse<string>> Login(LoginAuthReuest model)
        {
            var collaborator = await collaboratorRepository.Get(model.Email)
                ?? throw new BadRequestException("Usuario o contraseña incorrectos");

            var ValidatePassword = Hasher.ComparePassword(model.Password, collaborator.Password);
            if (!ValidatePassword)
            {
                throw new BadRequestException("Usuario o contraseña incorrectos");
            }

            var token = TokenHelper.Create(collaborator, configuration);
            return ResponseHelper.Create(token);
        }
    }
}
