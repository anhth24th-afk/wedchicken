namespace ChickenKingWeb.Models
{
    // Mục trong giỏ hàng — lưu trong Session (không dùng localStorage)
    public class CartItem
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
