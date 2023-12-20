using Pet4YouAPI.DTO;
using Pet4YouAPI.Models;

namespace Pet4YouAPI.DI
{
    public interface IOrderService
    {
        public Task<ICollection<OrderRequest>> GetUserInputOrders(int userId);

        public Task<ICollection<OrderRequest>> GetUserOutputOrders(int userId);

        public Task<ICollection<OrderRequest>> GetUserCompletedOrders(int userId);

        public Task<CreationResult> AddOrderRequest(OrderRequest orderRequest);
    }
}
