namespace AutoVadeProReact.Server.DTOs
{
    public class LoggedInUserDTO
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; }
        public LoggedInUserDTO( int id, bool IsAdmin) {
            this.Id = id;
            this.IsAdmin = IsAdmin;
        }   
    }
}
