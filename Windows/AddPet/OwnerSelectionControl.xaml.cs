using System.Windows;
using System.Windows.Controls;
using VDC_WPF_T.Model;

namespace VDC_WPF_T.Windows.AddPet
{
    public partial class OwnerSelectionControl : UserControl
    {
        public static readonly DependencyProperty SelectedOwnerProperty =
            DependencyProperty.Register("SelectedOwner", typeof(PetOwner), typeof(OwnerSelectionControl), new PropertyMetadata(null));

        public PetOwner SelectedOwner
        {
            get { return (PetOwner)GetValue(SelectedOwnerProperty); }
            set { SetValue(SelectedOwnerProperty, value); }
        }

        public OwnerSelectionControl()
        {
            InitializeComponent();
            DataContext = this;
        }

        // Temporary method to simulate owner selection for testing
        private void SelectOwnerButton_Click(object sender, RoutedEventArgs e)
        {
            // Here you would open your selection window and set the owner when it closes.
            // For testing, we set it directly.
            SelectedOwner = new PetOwner
            {
                Name = "Алексей",
                Surname = "Иванов",
                Patronymic = "Викторович",
                Email = "ivanov@test.com",
                Phone = "123-456-7890"
            };
        }
    }
}
