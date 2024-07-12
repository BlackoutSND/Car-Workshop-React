namespace AutoVadeProReact.Server.DTOs
{
    public class AddTimeSlotDTO
    {
        public int Id { get; set; }
        public DateTime SlotBegining { get; set; }
        public DateTime SlotEnding { get; set; }
        //public int StartingHour { get; set; }
        //public int EndingHour { get; set;}
    }
}
