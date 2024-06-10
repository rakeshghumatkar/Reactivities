using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager ;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if(user == null)
                return Unauthorized();
            
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if(result)
            {

                return new UserDto{
                    DisplayName = user.DisplayName,
                    Token = _tokenService.CreateToken(user),
                    Username = user.UserName,
                    Image = null,
                };
            }
            return Unauthorized();
        }


        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register (RegisterDto registerDto)
        {
            if(await _userManager.Users.AnyAsync(u => u.UserName == registerDto.UserName))
            {
                return BadRequest("Duplicate user");
            }
            var user = new AppUser{
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                // Image = null,
                DisplayName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return new UserDto{
                    DisplayName = registerDto.UserName,
                    Username = registerDto.UserName,
                    Token = _tokenService.CreateToken(user),
                    Image = null,
                };
            }

            return BadRequest("Error in registeration");

        }
    }
}