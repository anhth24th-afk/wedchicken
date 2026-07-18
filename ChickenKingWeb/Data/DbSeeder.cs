using ChickenKingWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace ChickenKingWeb.Data
{
    // Tự động nạp dữ liệu mẫu khi cơ sở dữ liệu trống
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext db)
        {
            db.Database.Migrate();

            if (!db.Users.Any(u => u.Role == "Admin"))
            {
                db.Users.Add(new User { Username = "admin", Password = "123456", Role = "Admin" });
            }

            if (!db.Products.Any())
            {
                db.Products.AddRange(
                    new Product { Name = "Đùi gà Cay Giòn", Description = "Lớp vỏ giòn tan cay nồng đặc trưng", Price = 45000, Category = "Gà Rán", Rating = 4.8, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuBHlR2Fpb1nNsz2A2oFvmgs4faeNY9-k9x-MdMxRNxtIwtLFNkEiy7TYFvpfN8QkStlsgVH1axWkHHFmQ7vFl6it_AmXG6KJ9-j8b8lfCkbu5aRAOnUXhcbT0jZjtKZxO-CJH0qarjrSRQ_aUdyJjN9pUKpC4nEgz2L05R-2nkbtCqwlbOI3hQUQZpZ7qJZ5fnYdYfjKtAMwV7h3FOdndN-MyvgXdmXR3Ft98EzaydMteYdvn9lY8ai2jJPC5afQdGQIAFEZnGDaDs" },
                    new Product { Name = "Combo Gia Đình", Description = "8 miếng gà + 2 món phụ + Coca 1L", Price = 320000, Category = "Combo", Rating = 4.9, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuDpnLwTQ5yMRRw3a2qxSCGumO_i2LhC2RkzlWlJbwuOmoBeSiII2-VLWZV8ZVuYKT007WdbEfyDGM6nTPaiY4jO5yUGMKTtzJGLFf_gXuRHOdh2gQnQW5VyAaG4ircnt2KDRzE8KInZ-6eWsjJlHW3f_SXIxgDGNOACr78aMAsKKUy3waY5jnYU-uTGUnXU2PlFca8AEmr15Ba3Xf44_a5gbsbiWXWJO8JM4ITvytfDbP3v3ttC0u3eDfF3kbfvPmS4nuFDfvrdGYw" },
                    new Product { Name = "Cánh Gà Giòn Cay", Description = "6 miếng cánh gà sốt cay ngọt", Price = 125000, Category = "Gà Rán", Rating = 4.7, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuBSu6bGM7ETXDLErdXuhzFb6zgHjD0-tS9z6TojjWG17OYJ51fkRlgOCGxglDXdAr4kXWzsHIq65KbpgltFKe__EJKT_qWvGNbETjz199l0bgiI0esGIdc7I5ZDW16qHM1s3dw3Jb7d6z_Tna3PUN1dc86n9lSW3AVyjJfgi_rHqsKul5I4XZI3M-317aFSiIcOQBCNtFBeSUWoAm7OIPOjVGde-20jtaeUuivrw22pIQAPsTlcX5JL45piw-gwEPgRqycPGTKnje0" },
                    new Product { Name = "Phần Tẩm Bột Vàng", Description = "Lườn gà tẩm bột chiên kèm nước sốt", Price = 99000, Category = "Món Phụ", Rating = 4.6, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuC5HfmEAi5Y1UmoYWkcEAp5XPRZbDbALI-XF5aFg5ZnJNto41LfQVzO5ef5I-9-9ldWy5aHh_YRTDp7C-sG_I763DRCI0TfU9xbwLzTnd2qeuflJ_AmfqbopPpnyp0IE-kI5_yettBj435ru0IgBKkBVhzkKeLkme2bs5adJ07RVzbGkmpHO33jkfiEInCAQ1lg6SFlyJknMLVx1sciSXBlUMrxUfxpddnGDqBwJC6RgmFNw5HcNLJ-3jMnvWr-M5fFecQ60UN2lC8" },
                    new Product { Name = "Xô Gà Vui Vẻ", Description = "12 miếng gà truyền thống công thức đặc biệt", Price = 249000, Category = "Combo", Rating = 5.0, Image = "https://lh3.googleusercontent.com/aida-public/AB6AXuDkEDeQ1mfKn6wGHak3Id6SI7cA3mCtTTA0Vi-jE2W4cRKeJNNWLu1LBbPj9i5jOFi8tlKHXCGOCXQ4uE_D2dYgNmQS-Urd_37Db1WaHimhEFJGhlftCNmrECNSJcf8Ie8AB5Ka2YV-bf8TJdbXWroGFtkNuTIiwyq6JkoD6o8n4AKo_fandI3Ybj5pw1viUKzcdoWf_-JQic0dgs4fEiS-O6p-HwSE43AGVsPTMVwIs9Ct5eSAUW4kHOLPhDK_68FMQog0FArUVEY" },
                    new Product { Name = "Burger Gà Giòn", Description = "Burger kẹp gà chiên giòn, xà lách và sốt mayo", Price = 55000, Category = "Gà Rán", Rating = 4.6, Image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&h=300&auto=format&fit=crop" },
                    new Product { Name = "Pepsi Lớn", Description = "Nước ngọt giải khát size lớn", Price = 25000, Category = "Đồ Uống", Rating = 4.8, Image = "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&h=300&auto=format&fit=crop" },
                    new Product { Name = "Khoai Tây Chiên Lớn", Description = "Khoai tây chiên vàng ruộm, giòn tan", Price = 35000, Category = "Món Phụ", Rating = 4.7, Image = "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=300&h=300&auto=format&fit=crop" }
                );
            }

            if (!db.News.Any())
            {
                db.News.AddRange(
                    new News
                    {
                        Title = "Chicken King khai trương chi nhánh thứ 10 tại TP.HCM",
                        Category = "Sự kiện",
                        Image = "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop",
                        Content = "Chicken King tự hào khai trương chi nhánh thứ 10 tại trung tâm TP.HCM với không gian hiện đại, phục vụ hơn 200 khách cùng lúc. Nhân dịp khai trương, giảm giá 30% toàn bộ menu trong tuần đầu tiên. Hãy đến và trải nghiệm hương vị gà rán nguyên bản cùng gia đình và bạn bè!",
                        CreatedAt = DateTime.Now.AddDays(-2)
                    },
                    new News
                    {
                        Title = "Ra mắt Combo Gia Đình mới - Tiết kiệm đến 25%",
                        Category = "Khuyến mãi",
                        Image = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
                        Content = "Combo Gia Đình mới bao gồm 8 miếng gà giòn, 2 phần khoai tây chiên lớn, 4 bánh mì bơ tỏi và Coca-Cola 1.5L. Giá chỉ 320.000đ - tiết kiệm đến 25% so với mua lẻ. Áp dụng tại tất cả chi nhánh và đặt hàng online.",
                        CreatedAt = DateTime.Now.AddDays(-5)
                    },
                    new News
                    {
                        Title = "Bí quyết lớp vỏ giòn rụm của Chicken King",
                        Category = "Ẩm thực",
                        Image = "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=800&auto=format&fit=crop",
                        Content = "Điều gì làm nên lớp vỏ giòn tan đặc trưng của Chicken King? Đó là công thức tẩm bột bí truyền với 11 loại gia vị, gà tươi được ướp trong 12 giờ và chiên ở nhiệt độ chuẩn 175 độ C. Mỗi miếng gà đều được kiểm tra chất lượng trước khi đến tay khách hàng.",
                        CreatedAt = DateTime.Now.AddDays(-10)
                    }
                );
            }

            if (!db.Employees.Any())
            {
                db.Employees.AddRange(
                    new Employee { Name = "Nguyễn Văn An", Phone = "0901234567", Shift = "Sáng", Position = "Quản lý ca", Salary = 12000000 },
                    new Employee { Name = "Trần Thị Bình", Phone = "0912345678", Shift = "Chiều", Position = "Đầu bếp", Salary = 10000000 },
                    new Employee { Name = "Lê Minh Cường", Phone = "0923456789", Shift = "Tối", Position = "Thu ngân", Salary = 8000000 }
                );
            }

            db.SaveChanges();
        }
    }
}
