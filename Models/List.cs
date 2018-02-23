using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripAngular4Core.Models
{
    public class ListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Guid OwnerId { get; set; }
    }
}
