using ChickenKingWeb.Data;
using ChickenKingWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChickenKingWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _db;

        public HomeController(ApplicationDbContext db) => _db = db;

        // Trang chủ: danh sách sản phẩm + tìm kiếm + lọc loại
        public async Task<IActionResult> Index(string? category, string? q)
        {
            var query = _db.Products.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(category) && category != "Tất cả")
                query = query.Where(p => p.Category == category);

            if (!string.IsNullOrWhiteSpace(q))
                query = query.Where(p => p.Name.Contains(q) || p.Description.Contains(q));

            ViewBag.ActiveCategory = string.IsNullOrEmpty(category) ? "Tất cả" : category;
            ViewBag.SearchQuery = q ?? "";

            return View(await query.OrderByDescending(p => p.Id).ToListAsync());
        }

        // Trang liên hệ
        public IActionResult Contact() => View();

        // Gửi phản hồi khách hàng → lưu SQL Server
        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> Contact(Feedback model)
        {
            if (!ModelState.IsValid) return View(model);
            model.Date = DateTime.Now;
            _db.Feedbacks.Add(model);
            await _db.SaveChangesAsync();
            TempData["Toast"] = "Cảm ơn bạn! Phản hồi đã được gửi thành công.";
            return RedirectToAction(nameof(Contact));
        }

        public IActionResult Error() => View();
    }
}
