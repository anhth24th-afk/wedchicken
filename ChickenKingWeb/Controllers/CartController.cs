using System.Security.Claims;
using ChickenKingWeb.Data;
using ChickenKingWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChickenKingWeb.Controllers
{
    // Giỏ hàng lưu trong Session, thao tác qua AJAX (thay thế localStorage)
    public class CartController : Controller
    {
        private const string CartKey = "CART";
        private readonly ApplicationDbContext _db;

        public CartController(ApplicationDbContext db) => _db = db;

        private List<CartItem> GetCart()
            => HttpContext.Session.GetObject<List<CartItem>>(CartKey) ?? new List<CartItem>();

        private void SaveCart(List<CartItem> cart)
            => HttpContext.Session.SetObject(CartKey, cart);

        // Lấy nội dung giỏ hàng (JSON) để render panel
        [HttpGet]
        public async Task<IActionResult> Items()
        {
            var cart = GetCart();
            var ids = cart.Select(c => c.ProductId).ToList();
            var products = await _db.Products.AsNoTracking()
                .Where(p => ids.Contains(p.Id)).ToListAsync();

            var items = cart
                .Where(c => products.Any(p => p.Id == c.ProductId))
                .Select(c =>
                {
                    var p = products.First(x => x.Id == c.ProductId);
                    return new
                    {
                        productId = p.Id,
                        name = p.Name,
                        image = p.Image,
                        price = p.Price,
                        quantity = c.Quantity
                    };
                }).ToList();

            return Json(new
            {
                items,
                total = items.Sum(i => i.price * i.quantity),
                count = items.Sum(i => i.quantity)
            });
        }

        // Thêm vào giỏ
        [HttpPost]
        public async Task<IActionResult> Add(int productId)
        {
            if (User.Identity?.IsAuthenticated != true)
                return Json(new { success = false, requireLogin = true, message = "Vui lòng đăng nhập để bắt đầu đặt món!" });

            var product = await _db.Products.FindAsync(productId);
            if (product == null)
                return Json(new { success = false, message = "Sản phẩm không tồn tại" });

            var cart = GetCart();
            var existing = cart.FirstOrDefault(c => c.ProductId == productId);
            if (existing != null) existing.Quantity++;
            else cart.Add(new CartItem { ProductId = productId, Quantity = 1 });
            SaveCart(cart);

            return Json(new { success = true, count = cart.Sum(c => c.Quantity), message = $"Đã thêm {product.Name} vào giỏ!" });
        }

        // Tăng / giảm số lượng
        [HttpPost]
        public IActionResult UpdateQuantity(int productId, int delta)
        {
            var cart = GetCart();
            var item = cart.FirstOrDefault(c => c.ProductId == productId);
            if (item != null)
            {
                item.Quantity = Math.Max(1, item.Quantity + delta);
                SaveCart(cart);
            }
            return Json(new { success = true });
        }

        // Bỏ một món
        [HttpPost]
        public async Task<IActionResult> Remove(int productId)
        {
            var cart = GetCart();
            cart.RemoveAll(c => c.ProductId == productId);
            SaveCart(cart);
            var name = (await _db.Products.FindAsync(productId))?.Name ?? "";
            return Json(new { success = true, message = string.IsNullOrEmpty(name) ? "Đã bỏ món" : $"Đã bỏ {name}" });
        }

        // Xóa sạch giỏ
        [HttpPost]
        public IActionResult Clear()
        {
            SaveCart(new List<CartItem>());
            return Json(new { success = true, message = "Đã dọn dẹp giỏ hàng" });
        }

        // Thanh toán → tạo Order + OrderDetail trong SQL Server
        [HttpPost]
        public async Task<IActionResult> Checkout(string? phone, string? address)
        {
            if (User.Identity?.IsAuthenticated != true)
                return Json(new { success = false, requireLogin = true, message = "Vui lòng đăng nhập để thanh toán!" });

            var cart = GetCart();
            if (cart.Count == 0)
                return Json(new { success = false, message = "Giỏ hàng đang trống" });

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var username = User.Identity!.Name ?? "";

            var ids = cart.Select(c => c.ProductId).ToList();
            var products = await _db.Products.Where(p => ids.Contains(p.Id)).ToListAsync();

            var order = new Order
            {
                UserId = userId,
                Name = username,
                Phone = phone ?? "",
                Address = address ?? "",
                Date = DateTime.Now,
                Status = "pending"
            };

            foreach (var item in cart)
            {
                var product = products.FirstOrDefault(p => p.Id == item.ProductId);
                if (product == null) continue;
                order.Details.Add(new OrderDetail
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    Price = product.Price
                });
            }

            if (order.Details.Count == 0)
                return Json(new { success = false, message = "Giỏ hàng không hợp lệ" });

            order.Total = order.Details.Sum(d => d.Price * d.Quantity);

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            SaveCart(new List<CartItem>());
            return Json(new
            {
                success = true,
                message = "Đặt hàng thành công! Đón xem đơn hàng của bạn.",
                redirect = Url.Action("Index", "Orders")
            });
        }
    }
}
