using System.ComponentModel.DataAnnotations;

namespace ChickenKingWeb.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        [StringLength(200)]
        public string Name { get; set; } = string.Empty;      // Tên người nhận

        [StringLength(20)]
        public string Phone { get; set; } = string.Empty;     // Điện thoại

        [StringLength(300)]
        public string Address { get; set; } = string.Empty;   // Địa chỉ

        public DateTime Date { get; set; } = DateTime.Now;    // Ngày đặt

        [StringLength(20)]
        public string Status { get; set; } = "pending";       // pending | completed | cancelled

        public decimal Total { get; set; }                    // Tổng tiền

        public ICollection<OrderDetail> Details { get; set; } = new List<OrderDetail>();
    }
}
