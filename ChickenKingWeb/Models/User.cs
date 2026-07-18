using System.ComponentModel.DataAnnotations;

namespace ChickenKingWeb.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required, StringLength(200)]
        public string Password { get; set; } = string.Empty;

        [StringLength(20)]
        public string Role { get; set; } = "Customer"; // "Admin" hoặc "Customer"

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
