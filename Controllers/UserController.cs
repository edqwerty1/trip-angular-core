using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TripAngular4Core.Domain;
using TripAngular4Core.Security;

namespace Trip_Angular4Core.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly Context _context;

        public UserController(Context context)
        {
            _context = context;
        }

        public class LoginDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromBody]LoginDto loginDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username && u.Password == loginDto.Password);
            if (user == null)
                return NotFound();

            var token = Guid.NewGuid();
            Session.TokenDictionary.Add(token, user.Id);
            user.Token = token;
            return Ok(user);
        }

        public class CreateDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string DisplayName { get; set; }
        }

        [HttpPost("[action]")]
        public IActionResult Create([FromBody]CreateDto createDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == createDto.Username && u.Password == createDto.Password);
            if (user != null)
                return BadRequest();

            var token = Guid.NewGuid();

            user = new User
            {
                Id = Guid.NewGuid(),
                DisplayName = createDto.DisplayName,
                Username = createDto.Username,
                Password = createDto.Password,
                Token = token
            };

            Session.TokenDictionary.Add(token, user.Id);
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpPost("[action]")]
        public IActionResult Logout()
        {
            var tokenString = Request.Headers["token"];

            if (String.IsNullOrWhiteSpace(tokenString))
                return Ok();

            Guid token;
            Guid.TryParse(tokenString, out token);

            if (token == null)
                return Ok();

            if (!Session.TokenDictionary.ContainsKey(token))
                return Ok();

            Session.TokenDictionary.Remove(token);

            return Ok();
        }
    }
}