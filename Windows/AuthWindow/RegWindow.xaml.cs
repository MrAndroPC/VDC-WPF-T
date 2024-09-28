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

namespace VDC_WPF_T.Windows.RegWindow
{
    /// <summary>
    /// Логика взаимодействия для RegWindow.xaml
    /// </summary>
    public partial class RegWindow : Window
    {
        public RegWindow()
        {
            InitializeComponent();
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string email = emailTextBox.Text;
            string password = passwordTextBox.Text;

            bool isRegenticated = await RegenticateUserAsync(email, password);
            if (isRegenticated)
            {
                // Mark the Regentication as successful.
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


        private async Task<bool> RegenticateUserAsync(string email, string password)
        {
            // Call your API for Regentication here.
            var client = new HttpClient();
            MessageBox.Show($"{email} {password}");
            var response = await client.PostAsJsonAsync("https://dummyjson.com/Reg/login",
                                                         new { Username = email, Password = password });

            if (response.IsSuccessStatusCode)
            {
                // You might want to store the user's session or token here.
                var userSession = await response.Content.ReadFromJsonAsync<UserSession>();
                MessageBox.Show($"{response.Content}\n{userSession}");
                Session.CurrentUser = userSession;
                return true;
            }

            return false;
        }

        private void TextBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                // Call the Login button click event handler
                LoginButton_Click(sender, e);
            }
        }

    }
}
