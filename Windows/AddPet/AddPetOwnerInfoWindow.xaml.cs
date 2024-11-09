using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using VDC_WPF_T.Model;

namespace VDC_WPF_T.Windows
{
    public partial class AddPetOwnerInfoWindow : Window
    {
        public ObservableCollection<PetOwner> PetOwners { get; set; }

        public AddPetOwnerInfoWindow()
        {
            InitializeComponent();
            PetOwners = new ObservableCollection<PetOwner>();
            DataContext = this;
            LoadMockData();
        }

        private async void SearchPet_Click(object sender, RoutedEventArgs e)
        {
            await SearchPetOwnersAsync(SearchTermTextBox.Text);
        }

        private Task SearchPetOwnersAsync(string searchTerm)
        {
            return Task.Run(() =>
            {
                // Simulate async search with mock data
                Dispatcher.Invoke(() =>
                {
                    PetOwners.Clear();
                    PetOwners.Add(new PetOwner { Surname = "Иванов", Name = "Алексей", Patronymic = "Викторович", Email = "ivanov@example.com", Phone = "+79210000001" });
                    PetOwners.Add(new PetOwner { Surname = "Смирнов", Name = "Борис", Patronymic = "Иванович", Email = "smirnov@example.com", Phone = "+79210000002" });
                });
            });
        }

        private void LoadMockData()
        {
            // Load initial data
            PetOwners.Add(new PetOwner { Surname = "Петров", Name = "Иван", Patronymic = "Петрович", Email = "petrov@example.com", Phone = "+79210000003" });
        }

        private void SelectOwner_Click(object sender, RoutedEventArgs e)
        {
            var button = sender as Button;
            int selectedOwnerId = (int)button.Tag;
            // Handle owner selection based on Id
        }

        private void PetOwnerList_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            var item = (sender as ListView).SelectedItem as PetOwner;
            if (item != null)
            {
                // Handle double-click to select owner
            }
        }

        private void Add_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}
