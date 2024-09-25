public static class Session
{
    public static UserSession CurrentUser { get; set; }
}

public class UserSession
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string AccessToken { get; set; }

    public override string ToString()
    {
        return $"Id: {Id}, Name: {Username}, Email: {Email}, Token: {AccessToken}";
    }
}
