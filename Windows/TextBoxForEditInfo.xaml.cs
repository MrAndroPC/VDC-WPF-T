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

namespace VDC_WPF_T.Windows
{
    /// <summary>
    /// Логика взаимодействия для TextBoxForEditInfo.xaml
    /// </summary>
    public partial class TextBoxForEditInfo : Window
    {
        public TextBoxForEditInfo()
        {
            InitializeComponent();
        }

        public void EditHeader (string text)
        {
            NameBlock.Text = text;
        }
    }
}
