using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AutoVadeProReact.Server.Data;
using AutoVadeProReact.Server.Models;

namespace AutoVadeProMVC.Controllers
{
    [Route("api/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly AppDbContext _context;
        public HomeController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var users = _context.Users.Find(id);
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }
    }
}
