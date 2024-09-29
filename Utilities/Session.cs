namespace VDC_WPF_T.Utilities
{
    public static class Session
    {
        public static UserSession CurrentUser { get; set; }
    }

    public class UserSession : VDC_WPF_T.Model.Vet // Session implements Vet model and stores additional info
    {
        public int Id { get; set; }
        public string AccessToken { get; set; }

        public override string ToString()
        {
            return $"Id: {Id}, Name:{Surname} {Name} {Patronymic}, Email: {Email}, Hospital: {Hospital}, Role: {Role} ,Token: {AccessToken}";
        }
    }
}
