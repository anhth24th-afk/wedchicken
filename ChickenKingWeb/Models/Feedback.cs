using System.ComponentModel.DataAnnotations;

namespace ChickenKingWeb.Models
{
    public class Feedback
    {
        public int Id { get; set; }

        [Required, StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress, StringLength(200)]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(2000)]
        public string Content { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.Now;
    }
}
