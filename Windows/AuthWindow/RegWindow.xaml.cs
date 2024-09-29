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
using System.Diagnostics;

namespace VDC_WPF_T.Windows.AuthWindow
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

        private async void RegButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show(
                $"{emailInput.GetValue()}\n" +
                $"{passwordInput.GetValue()}"
                );
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
