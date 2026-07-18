using System.Security.Claims;
using ChickenKingWeb.Data;
using ChickenKingWeb.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChickenKingWeb.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _db;

        public AccountController(ApplicationDbContext db) => _db = db;

        [HttpGet]
        public IActionResult Login(string? returnUrl)
        {
            if (User.Identity?.IsAuthenticated == true) return RedirectToAction("Index", "Home");
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        // Đăng nhập
        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string username, string password, string? returnUrl)
        {
            username = (username ?? "").Trim();
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
            if (user == null)
            {
                ViewBag.Error = "Tài khoản hoặc mật khẩu không chính xác";
                ViewBag.ReturnUrl = returnUrl;
                return View();
            }

            await SignInUser(user);
            TempData["Toast"] = user.Role == "Admin"
                ? "Đăng nhập Quản trị viên thành công!"
                : $"Chào mừng {user.Username} quay trở lại!";

            if (user.Role == "Admin") return RedirectToAction("Index", "Admin");
            if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl)) return Redirect(returnUrl);
            return RedirectToAction("Index", "Home");
        }

        // Đăng ký
        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(string username, string password)
        {
            username = (username ?? "").Trim();
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                ViewBag.Error = "Vui lòng nhập đầy đủ thông tin";
                ViewBag.Mode = "register";
                return View("Login");
            }
            if (await _db.Users.AnyAsync(u => u.Username == username))
            {
                ViewBag.Error = "Tên tài khoản đã tồn tại";
                ViewBag.Mode = "register";
                return View("Login");
            }

            var user = new User { Username = username, Password = password, Role = "Customer" };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            await SignInUser(user);
            TempData["Toast"] = "Đăng ký tài khoản thành công!";
            return RedirectToAction("Index", "Home");
        }

        // Đăng xuất
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Clear();
            TempData["Toast"] = "Đã đăng xuất thành công!";
            return RedirectToAction("Index", "Home");
        }

        // Trang hồ sơ cá nhân
        [Authorize]
        public IActionResult Profile() => View();

        private async Task SignInUser(User user)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.Username),
                new(ClaimTypes.Role, user.Role)
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
        }
    }
}
