using ChickenKingWeb.Data;
using ChickenKingWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChickenKingWeb.Controllers
{
    // Trang quản trị — chỉ Admin truy cập được
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _db;

        public AdminController(ApplicationDbContext db) => _db = db;

        // ============ BẢNG THỐNG KÊ (Dashboard + Doanh thu) ============
        public async Task<IActionResult> Index()
        {
            var orders = await _db.Orders.AsNoTracking().ToListAsync();
            var completed = orders.Where(o => o.Status == "completed").ToList();

            ViewBag.RevenueCompleted = completed.Sum(o => o.Total);
            ViewBag.RevenuePending = orders.Where(o => o.Status == "pending").Sum(o => o.Total);
            ViewBag.CompletedCount = completed.Count;
            ViewBag.TotalOrders = orders.Count;
            ViewBag.ProductCount = await _db.Products.CountAsync();
            ViewBag.UserCount = await _db.Users.CountAsync();
            ViewBag.NewsCount = await _db.News.CountAsync();
            ViewBag.EmployeeCount = await _db.Employees.CountAsync();
            ViewBag.FeedbackCount = await _db.Feedbacks.CountAsync();

            // Lịch sử giao dịch (đơn hoàn thành, mới nhất trước)
            var transactions = await _db.Orders.AsNoTracking()
                .Where(o => o.Status == "completed")
                .Include(o => o.User)
                .OrderByDescending(o => o.Date)
                .ToListAsync();

            return View(transactions);
        }

        // ============ CRUD SẢN PHẨM ============
        public async Task<IActionResult> Products()
            => View(await _db.Products.AsNoTracking().OrderByDescending(p => p.Id).ToListAsync());

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveProduct(Product model)
        {
            // Form gửi ô trống sẽ bind thành null → chuẩn hóa về chuỗi rỗng để không vi phạm NOT NULL
            model.Description ??= "";
            model.Image ??= "";
            if (string.IsNullOrWhiteSpace(model.Name) || model.Price <= 0)
            {
                TempData["ToastError"] = "Vui lòng nhập đầy đủ thông tin sản phẩm";
                return RedirectToAction(nameof(Products));
            }

            if (model.Id == 0)
            {
                model.Rating = 5.0;
                _db.Products.Add(model);
                TempData["Toast"] = "Đã thêm sản phẩm mới thành công!";
            }
            else
            {
                var existing = await _db.Products.FindAsync(model.Id);
                if (existing == null) return NotFound();
                existing.Name = model.Name;
                existing.Price = model.Price;
                existing.Category = model.Category;
                existing.Description = model.Description;
                existing.Image = model.Image;
                TempData["Toast"] = "Đã cập nhật sản phẩm thành công!";
            }
            await _db.SaveChangesAsync();
            return RedirectToAction(nameof(Products));
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product != null)
            {
                var used = await _db.OrderDetails.AnyAsync(d => d.ProductId == id);
                if (used)
                {
                    TempData["ToastError"] = "Không thể xóa: sản phẩm đã có trong đơn hàng";
                }
                else
                {
                    _db.Products.Remove(product);
                    await _db.SaveChangesAsync();
                    TempData["Toast"] = "Đã xóa sản phẩm";
                }
            }
            return RedirectToAction(nameof(Products));
        }

        // ============ QUẢN LÝ ĐƠN HÀNG ============
        public async Task<IActionResult> Orders()
        {
            var orders = await _db.Orders.AsNoTracking()
                .Include(o => o.User)
                .Include(o => o.Details).ThenInclude(d => d.Product)
                .OrderByDescending(o => o.Date)
                .ToListAsync();
            return View(orders);
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateOrderStatus(int id, string status)
        {
            var order = await _db.Orders.FindAsync(id);
            if (order != null && (status == "completed" || status == "cancelled"))
            {
                order.Status = status;
                await _db.SaveChangesAsync();
                TempData["Toast"] = status == "completed" ? "Đơn hàng đã hoàn thành!" : "Đã hủy đơn hàng";
            }
            return RedirectToAction(nameof(Orders));
        }

        // ============ QUẢN LÝ NGƯỜI DÙNG ============
        public async Task<IActionResult> Users()
            => View(await _db.Users.AsNoTracking().OrderBy(u => u.Id).ToListAsync());

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _db.Users.Include(u => u.Orders).FirstOrDefaultAsync(u => u.Id == id);
            if (user != null && user.Role != "Admin")
            {
                _db.Users.Remove(user);
                await _db.SaveChangesAsync();
                TempData["Toast"] = "Đã xóa người dùng";
            }
            return RedirectToAction(nameof(Users));
        }

        // ============ CRUD TIN TỨC ============
        public async Task<IActionResult> News()
            => View(await _db.News.AsNoTracking().OrderByDescending(n => n.CreatedAt).ToListAsync());

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveNews(News model)
        {
            model.Image ??= "";
            model.Category ??= "Tin tức";
            if (string.IsNullOrWhiteSpace(model.Title) || string.IsNullOrWhiteSpace(model.Content))
            {
                TempData["ToastError"] = "Vui lòng nhập đầy đủ tiêu đề và nội dung";
                return RedirectToAction(nameof(News));
            }

            if (model.Id == 0)
            {
                model.CreatedAt = DateTime.Now;
                _db.News.Add(model);
                TempData["Toast"] = "Đã đăng bài viết mới!";
            }
            else
            {
                var existing = await _db.News.FindAsync(model.Id);
                if (existing == null) return NotFound();
                existing.Title = model.Title;
                existing.Category = model.Category;
                existing.Image = model.Image;
                existing.Content = model.Content;
                TempData["Toast"] = "Đã cập nhật bài viết!";
            }
            await _db.SaveChangesAsync();
            return RedirectToAction(nameof(News));
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var news = await _db.News.FindAsync(id);
            if (news != null)
            {
                _db.News.Remove(news);
                await _db.SaveChangesAsync();
                TempData["Toast"] = "Đã xóa bài viết";
            }
            return RedirectToAction(nameof(News));
        }

        // ============ CRUD NHÂN VIÊN ============
        public async Task<IActionResult> Employees()
            => View(await _db.Employees.AsNoTracking().OrderBy(e => e.Id).ToListAsync());

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveEmployee(Employee model)
        {
            model.Phone ??= "";
            model.Position ??= "";
            model.Shift ??= "Sáng";
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                TempData["ToastError"] = "Vui lòng nhập tên nhân viên";
                return RedirectToAction(nameof(Employees));
            }

            if (model.Id == 0)
            {
                _db.Employees.Add(model);
                TempData["Toast"] = "Đã thêm nhân viên mới!";
            }
            else
            {
                var existing = await _db.Employees.FindAsync(model.Id);
                if (existing == null) return NotFound();
                existing.Name = model.Name;
                existing.Phone = model.Phone;
                existing.Shift = model.Shift;
                existing.Position = model.Position;
                existing.Salary = model.Salary;
                TempData["Toast"] = "Đã cập nhật nhân viên!";
            }
            await _db.SaveChangesAsync();
            return RedirectToAction(nameof(Employees));
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _db.Employees.FindAsync(id);
            if (employee != null)
            {
                _db.Employees.Remove(employee);
                await _db.SaveChangesAsync();
                TempData["Toast"] = "Đã xóa nhân viên";
            }
            return RedirectToAction(nameof(Employees));
        }

        // ============ PHẢN HỒI KHÁCH HÀNG ============
        public async Task<IActionResult> Feedbacks()
            => View(await _db.Feedbacks.AsNoTracking().OrderByDescending(f => f.Date).ToListAsync());

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var feedback = await _db.Feedbacks.FindAsync(id);
            if (feedback != null)
            {
                _db.Feedbacks.Remove(feedback);
                await _db.SaveChangesAsync();
                TempData["Toast"] = "Đã xóa phản hồi";
            }
            return RedirectToAction(nameof(Feedbacks));
        }
    }
}
