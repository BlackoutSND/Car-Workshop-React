using Microsoft.EntityFrameworkCore;
using AutoVadeProReact.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace AutoVadeProReact.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users {  get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<CarPart> CarParts { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }

    }
}
