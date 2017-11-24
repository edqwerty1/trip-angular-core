using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripAngular4Core.Security
{
    public class Session
    {
        public static Dictionary<Guid, Guid> TokenDictionary { get; set; } = new Dictionary<Guid, Guid>();
    }
}
