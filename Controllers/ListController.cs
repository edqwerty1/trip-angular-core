using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripAngular4Core.Domain;
using TripAngular4Core.Models;
using TripAngular4Core.Security;

namespace Trip_Angular4Core.Controllers
{
    [Produces("application/json")]
    [Route("api/List")]
    public class ListController : Controller
    {
        private readonly Context _context;

        public ListController(Context context)
        {
            _context = context;
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> Lists(Guid userId)
        {
            var lists = await _context.Lists.Where(t => t.Owner.Id == userId).ToListAsync();
            var listDtos = lists.Select(t => new ListDto
            {
                Id = t.Id,
                Name = t.Name,
                OwnerId = t.OwnerId
            }).ToList();
            return Ok(listDtos);
        }

        [HttpPost("[action]")]
        public IActionResult Create([FromBody]ListDto listDto)
        {
            var tokenString = Request.Headers["token"];

            if (String.IsNullOrWhiteSpace(tokenString))
                return Unauthorized();

            Guid token;
            Guid.TryParse(tokenString, out token);

            if (token == null)
                return Unauthorized();

            if (!Session.TokenDictionary.ContainsKey(token))
                return Unauthorized();
            var owner = _context.Users.First(t => t.Id == listDto.OwnerId);
            var list = new List
            {
                Name = listDto.Name,
                OwnerId = listDto.OwnerId,
                Password = "test",
                Public = false,
                
            };
            owner.MemberOfLists.Add(new UserList { List = list, User = owner });
            _context.Lists.Add(list);
            _context.SaveChanges();

            return Ok();
        }
    }
}