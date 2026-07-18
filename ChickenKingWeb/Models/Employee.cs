using System.ComponentModel.DataAnnotations;

namespace ChickenKingWeb.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(20)]
        public string Phone { get; set; } = string.Empty;

        [StringLength(50)]
        public string Shift { get; set; } = "Sáng";      // Ca làm: Sáng / Chiều / Tối

        [StringLength(100)]
        public string Position { get; set; } = string.Empty; // Vị trí

        public decimal Salary { get; set; }              // Lương
    }
}
