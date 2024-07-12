using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoVadeProReact.Server.Data;
using AutoVadeProReact.Server.Data.Enums;
using AutoVadeProReact.Server.Interfaces;
using AutoVadeProReact.Server.Models;
using AutoVadeProReact.Server.Services;
using AutoVadeProReact.Server.DTOs;
using System.Net.Sockets;

namespace AutoVadeProMVC.Controllers
{
    [Route("api/Tickets")]
    [ApiController]
    public class TicketController : Controller
    {
        private readonly ITicketRepository _ticketService;
        private readonly IPhotoService _photoService;

        public TicketController(ITicketRepository ticketService, IPhotoService photoService)
        {
            _ticketService = ticketService;
            _photoService = photoService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Ticket? ticket = await _ticketService.GetTicketByIdAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var Tickets = await _ticketService.GetTickets();
            return Ok(Tickets);
        }


        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(CreateTicketDTO ticketDTO)
        {
            bool check = await _ticketService.isUserExists((int)ticketDTO.UserId);
            if (!check)
            {
                return BadRequest();
            }
            else if (ModelState.IsValid)
            {

                var ticket = new Ticket
                {
                    Title = ticketDTO.Title,
                    Description = ticketDTO.Description,
                    UserId = ticketDTO.UserId,
                    Status = TicketStatus.Created,
                    Car = new Car
                    {
                        Brand = ticketDTO.Car.Brand,
                        Model = ticketDTO.Car.Model,
                        RegistrationId = ticketDTO.Car.RegistrationId
                    },
                };
                if (ticketDTO.Image != null)
                {
                    var result = await _photoService.AddPhotoAsync(ticketDTO.Image);
                    ticket.Image = result.Url.ToString();
                }

                _ticketService.Add(ticket);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }



        [HttpDelete, ActionName("Delete")]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ticketDetails = await _ticketService.GetTicketByIdAsync(id);
            if (ticketDetails == null)
            {
                return NotFound();
            }
            _ticketService.Delete(ticketDetails);
            return NoContent();
        }

        [HttpPut]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, EditTicketDTO ticketDTO)
        {
            var ticketReq = await _ticketService.GetTicketByIdAsyncNoTracking(id);
            if (ticketReq == null)
            {
                return NotFound();
            }

            var ticket = new Ticket
            {
                Id = ticketDTO.Id,
                Title = ticketDTO.Title,
                Description = ticketDTO.Description,
                Status = TicketStatus.Pending,
                DeducedProblem = ticketDTO.DeducedProblem,
                PaidPrice = ticketDTO.PaidPrice,
                UserId = ticketDTO.UserId,
                CarId = ticketReq.CarId,
            };


            if (ticketReq.Image != null)
            {
                try
                {
                    await _photoService.DeletePhotoAsync(ticketReq.Image);
                }
                catch
                {
                    return BadRequest();
                }

            }
            if (ticketDTO.Image != null)
            {
                var result = await _photoService.AddPhotoAsync(ticketDTO.Image);
                ticket.Image = result.Url.ToString();
            }
            _ticketService.Update(ticket);
            return Ok(ticket);

        }

        [HttpPost]
        [Route("Part/Add/{id}")]
        public async Task<IActionResult> AddPart(int id, AddPartDTO partDTO)
        {

            var ticketReq = await _ticketService.GetTicketByIdAsyncNoTracking(id);
            if (ticketReq == null)
            {
                return NotFound();
            }

            var ticket = new Ticket();
            ticket = ticketReq;
            ticket.CarParts.Add(new CarPart
            {
                Name = partDTO.Name,
                Quantity = partDTO.Quantity,
                Price = partDTO.Price
            });
            _ticketService.Update(ticket);
            return Ok(ticket);
        }

        [HttpPut]
        [Route("Status/Done/{id}")]
        public async Task<IActionResult> TicketIsDone(int id)
        {
            try
            {
                var ticketReq = await _ticketService.GetTicketByIdAsyncNoTracking(id);
                if (ticketReq != null)
                {
                    var ticket = new Ticket();
                    ticket = ticketReq;
                    ticket.Status = TicketStatus.Done;
                    _ticketService.Update(ticket);
                }
                return Ok();
            }
            catch { return NotFound(); }
        }

        [HttpPut]
        [Route("Status/Closed/{id}")]
        public async Task<IActionResult> TicketIsClosed(int id)
        {
            try
            {
                var ticketReq = await _ticketService.GetTicketByIdAsyncNoTracking(id);
                if (ticketReq != null)
                {
                    var ticket = new Ticket();
                    ticket = ticketReq;
                    ticket.Status = TicketStatus.Closed;
                    _ticketService.Update(ticket);
                }
                return Ok();
            }
            catch { return NotFound(); }
        }



        [HttpPost]
        [Route("TimeSlot/Add")]
        public async Task<IActionResult> AddTimeSlot(int id, AddTimeSlotDTO timeSlotDTO)
        {
            if (timeSlotDTO.SlotBegining > timeSlotDTO.SlotEnding||(timeSlotDTO.SlotBegining == timeSlotDTO.SlotEnding))
            {
                return BadRequest();
            }

            var ticketReq = await _ticketService.GetTicketByIdAsyncNoTracking(id);
            if (ticketReq == null) 
            {
                return NotFound();
            }

            TimeSlot timeSlot = new TimeSlot()
            {
                SlotBegining = timeSlotDTO.SlotBegining,
                SlotEnding = timeSlotDTO.SlotEnding

            };

            var ticket = new Ticket();
            ticket = ticketReq;
            ticket.TimeSlots.Add(timeSlot);
            _ticketService.Update(ticket);
            
            return Ok();
        }

        [HttpDelete, ActionName("Delete")]
        [Route("TimeSlot/Delete{id}")]
        public async Task<IActionResult> RemoveTimeSlot(int id)
        {
            var timeslotDetails = await _ticketService.GetTimeSlotByIdAsync(id);
            if (timeslotDetails == null)
            {
                return NotFound();
            }
            _ticketService.RemoveTimeSlot(timeslotDetails);
            return NoContent();
        }

        [HttpDelete, ActionName("Delete")]
        [Route("CarPart/Delete/{id}")]
        public async Task<IActionResult> RemoveCarPart(int id)
        {
            var carPartDetails = await _ticketService.GetCarPartByIdAsync(id);
            if (carPartDetails == null)
            {
                return NotFound();
            }
            _ticketService.RemoveCarPart(carPartDetails);
            return NoContent();
        }

    }
}
