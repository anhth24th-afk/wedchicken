using System.ComponentModel.DataAnnotations;

namespace ChickenKingWeb.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Range(0, 100000000)]
        public decimal Price { get; set; }

        [Required, StringLength(50)]
        public string Category { get; set; } = "Gà Rán";

        public string Image { get; set; } = string.Empty;

        public double Rating { get; set; } = 5.0;

        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
