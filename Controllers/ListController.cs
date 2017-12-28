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
            var locationDtos = lists.Select(t => new ListDto
            {
                Id = t.Id,
                Name = t.Name
            }).ToList();
            return Ok(locationDtos);
        }

        [HttpPut("[action]")]
        public IActionResult Location([FromBody]LocationDto locationDto)
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


            var location = _context.Locations.Include(t => t.Address).FirstOrDefault(t => t.Id == locationDto.Id.Value);

            if (location == null)
            {
                location = new Location { Id = Guid.NewGuid() };
                _context.Locations.Add(location);
            }

            if (location.Address == null)
                location.Address = locationDto.Address ?? new Address();
            else
            {
                location.Address.Address1 = locationDto.Address.Address1;
                location.Address.Address2 = locationDto.Address.Address2;
                location.Address.Address3 = locationDto.Address.Address3;
                location.Address.Address4 = locationDto.Address.Address4;
                location.Address.Address5 = locationDto.Address.Address5;
                location.Address.PostCode = locationDto.Address.PostCode;
            }
            location.ImageUrl = locationDto.ImageUrl;
            location.Name = locationDto.Name;
            location.Price = locationDto.Price;
            location.Nights = locationDto.Nights;

            if (location.Id == Guid.Empty)
                location.Id = Guid.NewGuid();

            if (location.Address?.Id == Guid.Empty)
                location.Address.Id = Guid.NewGuid();

            _context.SaveChanges();

            return Ok();
        }
    }
}