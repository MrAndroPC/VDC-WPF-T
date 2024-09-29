using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

namespace VDC_WPF_T.Windows
{
    /// <summary>
    /// Логика взаимодействия для EditPatientInfoWindow.xaml
    /// </summary>
    public partial class AddPetOwnerInfoWindow : Window
    {
        public AddPetOwnerInfoWindow()
        {
            InitializeComponent();
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
