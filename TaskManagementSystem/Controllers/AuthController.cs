using Microsoft.AspNetCore.Mvc;
using TaskManagementSystem.Data;
using TaskManagementSystem.Models;
using TaskManagementSystem.Services;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace TaskManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(AppDbContext context, ITokenService tokenService) : ControllerBase
    {
        private readonly AppDbContext _context = context;
        private readonly ITokenService _tokenService = tokenService;

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(string username, string password)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
                return BadRequest("Username already exists.");

            using var hmac = new HMACSHA512();
            var salt = hmac.Key;

            var passwordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = username,
                PasswordHash = passwordHash,
                PasswordSalt = Convert.ToBase64String(salt)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(_tokenService.CreateToken(user));
        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null) return Unauthorized("Invalid username.");

            using var hmac = new HMACSHA512(Convert.FromBase64String(user.PasswordSalt));

            var computedHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));

            if (user.PasswordHash != computedHash) return Unauthorized("Invalid password.");

            return Ok(_tokenService.CreateToken(user));
        }

    }
}
