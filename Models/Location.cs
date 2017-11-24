using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripAngular4Core.Domain;

namespace TripAngular4Core.Models
{
    public class LocationDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
        public int Nights { get; set; }
        public IList<Guid> UpVotes { get; set; }
        public IList<Guid> DownVotes { get; set; }
    }
}
