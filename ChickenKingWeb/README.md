# CHICKEN KING — ASP.NET Core MVC + EF Core + SQL Server

Chuyển đổi từ trang web tĩnh (HTML + CSS + Vanilla JS + localStorage) sang ASP.NET Core MVC,
Entity Framework Core và SQL Server (Somee). Giao diện gốc được giữ nguyên 100%.

## Cấu trúc dự án

```
ChickenKingWeb
│
├── Controllers
│   ├── HomeController.cs      → Trang chủ, tìm kiếm, lọc loại, liên hệ (lưu phản hồi)
│   ├── NewsController.cs      → Tin tức + chi tiết tin tức
│   ├── AccountController.cs   → Đăng nhập / Đăng ký / Đăng xuất / Hồ sơ (Cookie Auth)
│   ├── CartController.cs      → Giỏ hàng (Session + AJAX) + Thanh toán (tạo Order)
│   ├── OrdersController.cs    → Lịch sử đơn hàng của khách
│   └── AdminController.cs     → Dashboard thống kê + CRUD sản phẩm/tin tức/nhân viên
│                                + quản lý đơn hàng/người dùng + xem phản hồi
├── Models
│   ├── Product.cs             (Id, Name, Description, Price, Category, Image, Rating)
│   ├── News.cs                (Id, Title, Category, Image, Content, CreatedAt)
│   ├── User.cs                (Id, Username, Password, Role)
│   ├── Order.cs               (Id, UserId, Name, Phone, Address, Date, Status, Total)
│   ├── OrderDetail.cs         (Id, OrderId, ProductId, Quantity, Price)
│   ├── Employee.cs            (Id, Name, Phone, Shift, Position, Salary)
│   ├── Feedback.cs            (Id, Name, Email, Content, Date)
│   └── CartItem.cs            (mục giỏ hàng — lưu trong Session)
├── Data
│   ├── ApplicationDbContext.cs
│   ├── DbSeeder.cs            → tự migrate + nạp dữ liệu mẫu khi khởi động
│   └── SessionExtensions.cs
├── Views
│   ├── Shared: _Layout, _AdminLayout, _Header, _Sidebar, _CartPanel, _BottomNav, Error
│   ├── Home: Index (trang chủ), Contact (liên hệ)
│   ├── News: Index, Details
│   ├── Account: Login (đăng nhập/đăng ký), Profile
│   ├── Orders: Index (lịch sử đơn)
│   └── Admin: Index (thống kê + doanh thu), Products, Orders, Users, News, Employees, Feedbacks
├── Migrations                 → InitialCreate
├── wwwroot
│   ├── css/style.css          → CSS gốc + bổ sung (sidebar, tin tức, liên hệ)
│   ├── js/site.js             → JS mới: KHÔNG dùng localStorage, giỏ hàng qua AJAX
│   └── images/
└── appsettings.json           → chuỗi kết nối SQL Server (Somee)
```

## Tài khoản mặc định

| Vai trò   | Tài khoản | Mật khẩu |
|-----------|-----------|----------|
| Admin     | `admin`   | `123456` |
| Khách     | tự đăng ký trên trang |

- **Admin** → tự chuyển đến `/Admin` (Dashboard). Khách thường bị chặn truy cập trang quản trị.
- **Khách hàng** → mua hàng, xem lịch sử đơn, gửi phản hồi.

## Cách chạy (máy local)

```bash
cd ChickenKingWeb
dotnet run
```

- Ở môi trường Development, app dùng LocalDB (`appsettings.Development.json`).
- Khi khởi động, app **tự chạy migration và nạp dữ liệu mẫu** (8 sản phẩm, 3 bài viết, 3 nhân viên, tài khoản admin).

## Kết nối SQL Server trên Somee

1. Chuỗi kết nối Somee (database `hoanganh`) đã được cấu hình sẵn trong `appsettings.json`
   (`DefaultConnection`). Nếu đổi tài khoản/DB, dán chuỗi mới của Somee vào và giữ thêm
   `TrustServerCertificate=True;Encrypt=False`.
2. Chạy migration (chọn 1 trong 2 cách):
   - **Tự động**: chỉ cần chạy app — `DbSeeder` sẽ gọi `Database.Migrate()` lúc khởi động.
   - **Thủ công**:
     ```bash
     dotnet tool install --global dotnet-ef   # nếu chưa có
     dotnet ef database update
     ```
3. Nếu database trên Somee đã có bảng cũ khác schema, hãy xóa các bảng cũ trước
   (Somee không cho DROP DATABASE).

## Thay đổi so với bản localStorage

| Trước (script.js)                    | Sau (ASP.NET Core MVC)                          |
|--------------------------------------|--------------------------------------------------|
| `localStorage['products']`           | Bảng `Products` (SQL Server, CRUD trong Admin)   |
| `localStorage['users']`              | Bảng `Users` + Cookie Authentication + phân quyền |
| `localStorage['orders']`             | Bảng `Orders` + `OrderDetails`                   |
| `localStorage['cart']`               | Session (server) + AJAX `CartController`         |
| Admin hard-code `admin/123456`       | Seed vào bảng `Users` với Role = Admin           |
| Render toàn bộ bằng JS               | Razor Views + Partial Views (_Header, _Sidebar, _CartPanel, _BottomNav) |

Chức năng mới bổ sung theo yêu cầu: Tin tức (+ chi tiết), Liên hệ/Phản hồi, CRUD Nhân viên, Bảng thống kê.

> Lưu ý: mật khẩu đang lưu dạng thuần (plain text) để khớp dữ liệu mẫu của đồ án.
> Khi triển khai thật nên băm mật khẩu (BCrypt/Identity).
