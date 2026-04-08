using Microsoft.Extensions.Configuration;
using TalentInsights.Application.Helpers;
using TalentInsights.Application.Interfaces;
using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.Helpers;
using TalentInsights.Application.Models.Requests.Auth;
using TalentInsights.Application.Models.Responses;
using TalentInsights.Domain.Exceptions;
using TalentInsights.Domain.Interfaces.Repositories;
using TalentInsights.Shared;

namespace TalentInsights.Application.Services
{
    public class AuthService(ICollaboratorRepository collaboratorRepository, IConfiguration configuration, ICacheService cacheService) : IAuthService
    {
        public async Task<GenericResponse<LoginAuthResponse>> Login(LoginAuthReuest model)
        {
            var collaborator = await collaboratorRepository.Get(model.Email)
                ?? throw new BadRequestException("Usuario o contraseña incorrectos");

            var ValidatePassword = Hasher.ComparePassword(model.Password, collaborator.Password);
            if (!ValidatePassword)
            {
                throw new BadRequestException("Usuario o contraseña incorrectos");
            }

            var token = TokenHelper.Create(collaborator.Id, configuration, cacheService);
            var refreshToken =

            cacheService.Create($"auth:tokens:{token}", TimeSpan.FromMinutes(5), token);
            return ResponseHelper.Create(new LoginAuthResponse
            {
                Token = token,
                RefreshToken = refreshToken
            });
        }

        public async Task<GenericResponse<LoginAuthResponse>> Renew(RenewAuthRequest model)
        {
            var findRefreshTokan = cacheService.Get<RefreshToken>(CacheHelper.AuthRefreshTokenKey(model.RefreshToken))
                ?? throw new NotFoundException("El token para refrescar expiro, no existe o es incorrecto");

            var token = TokenHelper.Create(findRefreshTokan.CollaboratorId, configuration, cacheService);
            var refreshToken = TokenHelper.CreateRefresh(findRefreshTokan.CollaboratorId, configuration, cacheService);

            cacheService.Delete(CacheHelper.AuthRefreshTokenKey(model.RefreshToken));

            return ResponseHelper.Create(new LoginAuthResponse
            {
                Token = token,
                RefreshToken = refreshToken
            });
        }
    }
}
