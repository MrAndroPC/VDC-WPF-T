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
using static System.Net.Mime.MediaTypeNames;

namespace VDC_WPF_T.Windows
{
    /// <summary>
    /// Логика взаимодействия для TextBoxForEditInfo.xaml
    /// </summary>
    public partial class TextBoxForEditInfo : Window
    {
        public string ResultData { get; private set; }
        public TextBoxForEditInfo(string header, string content)
        {
            InitializeComponent();
            NameBlock.Text = header;
            InfoTextBox.Text = content;
        }

        public void SetResultData(string data)
        {
            ResultData = data;
        }

        void SaveDataAndClose()
        {
            SetResultData(InfoTextBox.Text);

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
