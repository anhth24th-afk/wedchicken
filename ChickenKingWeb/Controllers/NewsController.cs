using ChickenKingWeb.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChickenKingWeb.Controllers
{
    public class NewsController : Controller
    {
        private readonly ApplicationDbContext _db;

        public NewsController(ApplicationDbContext db) => _db = db;

        // Danh sách tin tức
        public async Task<IActionResult> Index()
        {
            var news = await _db.News.AsNoTracking()
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
            return View(news);
        }

        // Chi tiết tin tức
        public async Task<IActionResult> Details(int id)
        {
            var item = await _db.News.AsNoTracking().FirstOrDefaultAsync(n => n.Id == id);
            if (item == null) return NotFound();

            ViewBag.Related = await _db.News.AsNoTracking()
                .Where(n => n.Id != id)
                .OrderByDescending(n => n.CreatedAt)
                .Take(3)
                .ToListAsync();

            return View(item);
        }
    }
}
