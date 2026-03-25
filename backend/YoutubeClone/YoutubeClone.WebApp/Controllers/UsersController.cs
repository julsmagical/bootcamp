using Microsoft.AspNetCore.Mvc;
using YoutubeClone.Application.Models.Request.Users;

namespace YoutubeClone.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpPost] //CREATE
        public async Task<IActionResult> Create([FromBody] CreateUsersRequest model)
        {
            return Ok($"Usuario {model.DisplayName} creado!");
        }

        [HttpPut("{id:guid}")] //UPDATE
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUsersRequest model)
        {
            return Ok($"Usuario actualizado: {id} - {model.DisplayName}");
        }

        [HttpDelete("{id:guid}")] //DELETE
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok($"Usuario eliminado: {id}");
        }

        [HttpGet("{id:guid}")] //READ (a un user en particular)
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok($"Obtener usuario con id: {id}");
        }

        [HttpGet] //READ (usando FromQuery)
        public async Task<IActionResult> GetAll([FromQuery] GetAllUsersRequest model)
        {
            return Ok($"Todos los usuarios: limit: {model.Limit}, offset: {model.Offset}, username: {model.UserName}, email: {model.Email}, country: {model.Country}");
        }
    }
}
