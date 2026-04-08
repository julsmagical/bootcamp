using Microsoft.Extensions.Caching.Memory;
using TalentInsights.Application.Interfaces.Services;

namespace TalentInsights.Application.Services
{
    public class CacheService(IMemoryCache memoryCache) : ICacheService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key">Clave de cache. Ej: toknes:<value></param>
        /// <param name="expiration"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public T Create<T>(string key, TimeSpan expiration, T value)
        {
            try
            {
                var create = memoryCache.GetOrCreate(key, (factory) =>
                {
                    factory.SlidingExpiration = expiration;
                    return value;
                });
                return create is null ? throw new Exception("No se pudo establecer la cache") : create;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool Delete(string key)
        {
            try
            {
                memoryCache.Remove(key);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public T? Get<T>(string key)
        {
            try
            {
                return memoryCache.Get<T>(key);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
