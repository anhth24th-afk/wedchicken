using System.ComponentModel.DataAnnotations;

namespace ChickenKingWeb.Models
{
    public class News
    {
        public int Id { get; set; }

        [Required, StringLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string Category { get; set; } = "Tin tức";

        public string Image { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
