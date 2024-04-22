using System;
using System.Collections.Generic;
using System.Linq;
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

namespace VDC_WPF_T.Windows.PetWindow.HealthState
{
    /// <summary>
    /// Логика взаимодействия для HealthState.xaml
    /// </summary>
    public partial class HealthState : Window
    {
        public Pet _pet { get; set; } = new Pet();
        public HealthState(Pet pet)
        {
            _pet = pet;
            DataContext = this;
            InitializeComponent();
        }
        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
         
        }
        private async void CopyToClipboard(object sender, RoutedEventArgs e)
        {
            var hyperlink = sender as Hyperlink;
            if (hyperlink != null)
            {
                var email = hyperlink.Inlines.FirstInline as Run;
                if (email != null)
                {
                    Clipboard.SetText(email.Text);
                    popup.IsOpen = true;
                    await Task.Delay(2000); 
                    popup.IsOpen = false;
                }
            }
        }
    }
}
