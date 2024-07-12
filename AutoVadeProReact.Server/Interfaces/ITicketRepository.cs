using AutoVadeProReact.Server.Models;
using AutoVadeProReact.Server.Data;
using AutoVadeProReact.Server.Data.Enums;

namespace AutoVadeProReact.Server.Interfaces
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetTickets();
        Task<Ticket> GetTicketByIdAsync(int ticketId);
        Task<Ticket> GetTicketByIdAsyncNoTracking(int ticketId);
        Task<TimeSlot> GetTimeSlotByIdAsync(int id);
        Task<CarPart> GetCarPartByIdAsync(int id);
        Task<int> GetCountAsync();
        Task<int> GetCountWithStatus(TicketStatus status);
        Task<bool> isUserExists(int id);
        bool RemoveCarPart(CarPart carPart);
        bool RemoveTimeSlot(TimeSlot timeSlot);
        bool Add(Ticket ticket);
        bool Update(Ticket ticket);
        bool Delete(Ticket ticket);
        bool Save();
    }
}
