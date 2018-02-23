using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TripAngular4Core.Domain
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<List> Lists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .HasMany(e => e.UpVotes)
                .WithOne(p => p.UpVoteLocation);
            modelBuilder.Entity<Location>()
                .HasMany(e => e.DownVotes)
                .WithOne(p => p.DownVoteLocation);


            modelBuilder.Entity<User>()
               .HasMany(t => t.OwnedLists).WithOne(t => t.Owner);


            modelBuilder.Entity<UserList>()
            .HasKey(ul => new { ul.UserId, ul.ListId });

            modelBuilder.Entity<UserList>()
                .HasOne(ul => ul.List)
                .WithMany(l => l.Users)
                .HasForeignKey(ul => ul.ListId);

            modelBuilder.Entity<UserList>()
                .HasOne(ul => ul.User)
                .WithMany(l => l.MemberOfLists)
                .HasForeignKey(ul => ul.UserId);
        }

    }

    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        [NotMapped]
        public Guid Token { get; set; }

        public Location UpVoteLocation { get; set; }
        public Location DownVoteLocation { get; set; }

        public ICollection<List> OwnedLists { get; set; }
        public ICollection<UserList> MemberOfLists { get; set; }
    }

    public class UserList
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public int ListId { get; set; }
        public List List { get; set; }
    }

    public class List
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public User Owner { get; set; }
        public Guid OwnerId { get; set; }
        public bool Public { get; set; }
        public string Password { get; set; }
        public ICollection<UserList> Users { get; set; }
    }

    public class Location
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public double Price { get; set; }
        public string ImageUrl { get; set; }
        public int Nights { get; set; }
        public List<User> UpVotes { get; set; }
        public List<User> DownVotes { get; set; }
    }

    public class Address
    {
        public Guid Id { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        public string Address5 { get; set; }
        public string PostCode { get; set; }
    }
}
