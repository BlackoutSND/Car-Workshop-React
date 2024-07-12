using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using AutoVadeProReact.Server.Data;
using AutoVadeProReact.Server.Interfaces;
using AutoVadeProReact.Server.Models;
using AutoVadeProReact.Server.Services;
using AutoVadeProReact.Server.DTOs;
using Microsoft.AspNetCore.Identity;

namespace AutoVadeProMVC.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userService;
        //private readonly UserManager<User> _userManager;
        private readonly IPhotoService _photoService;
        public UserController(IUserRepository userService, IPhotoService photoService)
        {
            _userService = userService;
            _photoService = photoService;
            //_userManager = userManager;
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            User? user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var Users = await _userService.GetUsers();
            return Ok(Users);
        }

        [HttpPost]
        public async Task<IActionResult> Create( CreateUserDTO userDTO)
        {
            if (await _userService.GetUserByLoginNoTracking(userDTO.Login) != null)
            {
                return BadRequest();
            }
            else if (ModelState.IsValid)
            {

                var user = new User
                {
                    Name = userDTO.Name,
                    Surname = userDTO.Surname,
                    Login = userDTO.Login,
                    Password = userDTO.Password,
                    //Image = result.Url.ToString(),
                    Wage = userDTO.Wage
                };
                if (userDTO.Image != null)
                {
                    var result = await _photoService.AddPhotoAsync(userDTO.Image);
                    user.Image = result.Url.ToString();
                }
                _userService.Add(user);
                return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Edit([FromRoute] int id, EditUserDTO userDTO)
        {

            var userReq = await _userService.GetUserByIdNoTracking(id);
            if (userReq == null)
            {
                return NotFound();
            }
            var user = new User
            {
                Id = userDTO.Id,
                Name = userDTO.Name,
                Surname = userDTO.Surname,
                Login = userDTO.Login,
                Password = userDTO.Password,
                //Image = result.Url.ToString(),
                Wage = userDTO.Wage,
                IsAdmin = userDTO.IsAdmin,
            };
            if (userReq.Image != null)
            {
                try
                {
                    await _photoService.DeletePhotoAsync(userReq.Image);
                }
                catch
                {
                    return BadRequest();
                }

            }
            if (userDTO.Image != null)
            {
                var result = await _photoService.AddPhotoAsync(userDTO.Image);
                user.Image = result.Url.ToString();
            }
            _userService.Update(user);
            return Ok(user);
        }

        [HttpDelete, ActionName("Delete")]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            var userDetails = await _userService.GetUserById(id);
            if (userDetails == null)
            {
                return NotFound();
            }
            _userService.Delete(userDetails);
            return NoContent();
        }

        [HttpPost]
        [Route("SignIn")]
        public async Task<IActionResult> SignIn(SignInUserDTO userCredsDTO)
        {
            try
            {
                if (userCredsDTO == null || string.IsNullOrEmpty(userCredsDTO.Login) || string.IsNullOrEmpty(userCredsDTO.Password))
                {
                    return BadRequest("Invalid login credentials.");
                }

                User user = await _userService.GetUserByLoginPassword(userCredsDTO.Login, userCredsDTO.Password);

                if (user != null)
                {
                    LoggedInUser.Id = user.Id;
                    LoggedInUser.IsAdmin = user.IsAdmin;
                    return Ok(user); // Consider returning a DTO instead of the user entity for security reasons
                }

                return NotFound("User not found.");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        [Route("SignOut")]
        public IActionResult SignOutUser()
        {
            LoggedInUser.IsAdmin = false;
            LoggedInUser.Id = -1;
            return Ok();
        }

        [HttpGet]
        [Route("CurUser")]
        public IActionResult GetCurUserRole()
        {
            LoggedInUserDTO res = new LoggedInUserDTO(LoggedInUser.Id,LoggedInUser.IsAdmin);
            return Ok(res);
        }

    }


}
