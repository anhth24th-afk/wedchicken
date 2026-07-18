using System.Security.Claims;
using ChickenKingWeb.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChickenKingWeb.Controllers
{
    // Lịch sử đơn hàng của khách hàng
    [Authorize]
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext _db;

        public OrdersController(ApplicationDbContext db) => _db = db;

        public async Task<IActionResult> Index()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var orders = await _db.Orders.AsNoTracking()
                .Where(o => o.UserId == userId)
                .Include(o => o.Details).ThenInclude(d => d.Product)
                .OrderByDescending(o => o.Date)
                .ToListAsync();
            return View(orders);
        }
    }
}
