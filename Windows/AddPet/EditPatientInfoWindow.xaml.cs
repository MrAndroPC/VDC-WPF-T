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
    public partial class EditPatientInfoWindow : Window
    {
        public ObservableCollection<string> ResultData { get; private set; }
        public EditPatientInfoWindow(ObservableCollection<string> content)
        {
            InitializeComponent();
            name.Text = content[0];
            type.Text = content[2];
            sex.Text = content[3];
            age.Text = content[4];
            breed.Text = content[5];
            weight.Text = content[6];
            num_mic.Text = content[7];
        }

        public void SetResultData(ObservableCollection<string> data)
        {
            ResultData = data;
        }

        void SaveDataAndClose()
        {
            ObservableCollection<string> data = new ObservableCollection<string>  {
                name.Text, type.Text, sex.Text, age.Text, breed.Text, weight.Text, num_mic.Text
            };
            SetResultData(data);

        }
        
        private void Add_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
            SaveDataAndClose();

        }

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }

  
    }
}
