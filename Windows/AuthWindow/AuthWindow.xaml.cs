using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using static System.Collections.Specialized.BitVector32;
using VDC_WPF_T.Utilities;
using System.Net.Http.Json;

namespace VDC_WPF_T.Windows.AuthWindow
{
    /// <summary>
    /// Логика взаимодействия для AuthWindow.xaml
    /// </summary>
    public partial class AuthWindow : Window
    {
        public AuthWindow()
        {
            InitializeComponent();
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string email = emailTextBox.Text;
            string password = passwordTextBox.Text;

            bool isAuthenticated = await AuthenticateUserAsync(email, password);
            if (isAuthenticated)
            {
                // Mark the authentication as successful.
                this.DialogResult = true;
                this.Close();
            }
            else
            {
                MessageBox.Show("Invalid credentials. Please try again.");
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = false; // This will close the window.
            Application.Current.Shutdown(); // Close the application if login is canceled.
        }


        private async Task<bool> AuthenticateUserAsync(string email, string password)
        {
            // Call your API for authentication here.
            var client = new HttpClient();
            MessageBox.Show($"{email} {password}");
            var response = await client.PostAsJsonAsync("https://dummyjson.com/auth/login",
                                                         new { Username = email, Password = password });

            if (response.IsSuccessStatusCode)
            {
                // You might want to store the user's session or token here.
                var userSession = await response.Content.ReadFromJsonAsync<UserSession>();
                MessageBox.Show($"{response.Content}\n{userSession}");
                Session.CurrentUser = userSession;
                return true;
            }

            UserSession t_userSession = new UserSession() { 
                Id = 1,
                Name = "TestN",
                Surname = "TestS",
                Patronymic = "TestP",
                Email = email,
                Phone = "8-(800)-555-35-35",
                Role = "Tester",
                Hospital = $"Hospital {"Test"}",
                PicSource = new Uri("https://img.freepik.com/premium-photo/veterinarian-digital-avatar-generative-ai_934475-9224.jpg")
            };
            Session.CurrentUser = t_userSession;
            return true;
        }

        private void TextBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                // Call the Login button click event handler
                LoginButton_Click(sender, e);
            }
        }

        private void RegButton_Click(object sender, RoutedEventArgs e)
        {
            var regWindow = new RegWindow();
            regWindow.ShowDialog();
        }
    }
}
