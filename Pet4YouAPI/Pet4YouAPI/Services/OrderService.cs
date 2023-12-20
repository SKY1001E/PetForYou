using Pet4YouAPI.Models;
using Pet4YouAPI.DBContext;
using Pet4YouAPI.DI;
using Microsoft.AspNetCore.Mvc;
using Pet4YouAPI.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.RegularExpressions;
using System.Reflection.Metadata.Ecma335;

namespace Pet4YouAPI.Services
{
    public class OrderService : IOrderService
    {
        private Pet4YouContext _context;

        public OrderService(Pet4YouContext context)
        {
            _context = context;
        }

        public async Task<CreationResult> AddOrderRequest(OrderRequest orderRequest)
        {
            bool isUserExists = await _context.Users.Where(e => e.Id == orderRequest.UserId).AnyAsync();
            if (!isUserExists)
                return CreationResult.IncorrectRefference;
            bool isAdvertisementExists = await _context.Advertisements.Where(e => e.Id == orderRequest.AdvertisementId).AnyAsync();
            if (!isAdvertisementExists)
                return CreationResult.IncorrectRefference;
            orderRequest.Status = "new";
            _context.OrderRequests.Add(orderRequest);
            await _context.SaveChangesAsync();
            return CreationResult.Success;
        }

        public async Task<ICollection<OrderRequest>> GetUserCompletedOrders(int userId)
        {
            object[] paramsArray = new object[] { userId };
            string sqlExpression = "SELECT * FROM OrderRequests " +
                "WHERE (AdvertisementId IN " +
                "(SELECT Id FROM Advertisements WHERE UserId = {0}) OR UserId = {0}) " +
                "AND (Status = 'rejected' OR Status = 'approved') ";

            ICollection<OrderRequest> orders = await _context.OrderRequests
                .FromSqlRaw(sqlExpression, paramsArray)
                .Include(e => e.User)
                .Include(e => e.Advertisement)
                .ToListAsync();
            return orders;
        }

        public async Task<ICollection<OrderRequest>> GetUserInputOrders(int userId)
        {
            object[] paramsArray = new object[] { userId };
            string sqlExpression = "SELECT * FROM OrderRequests " +
                "WHERE AdvertisementId IN " +
                "(SELECT Id FROM Advertisements WHERE UserId = {0}) " +
                "AND Status <> 'completed'";

            ICollection<OrderRequest> orders = await _context.OrderRequests
                .FromSqlRaw(sqlExpression, paramsArray)
                .Include(e => e.User)
                .Include(e => e.Advertisement)
                .ToListAsync();
            return orders;
        }

        public async Task<ICollection<OrderRequest>> GetUserOutputOrders(int userId)
        {
            ICollection<OrderRequest> orders = await _context.OrderRequests
                .Where(e => e.UserId == userId && e.Status != "completed")
                .Include(e => e.Advertisement)
                .ToListAsync();
            return orders;
        }
    }
}
