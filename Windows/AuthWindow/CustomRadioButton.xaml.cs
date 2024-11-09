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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace VDC_WPF_T.Windows.AuthWindow
{
    /// <summary>
    /// Логика взаимодействия для UserControl1.xaml
    /// </summary>
    public partial class CustomRadioButton : UserControl
    {
        public CustomRadioButton()
        {
            InitializeComponent();
            radioButton.Checked += RadioButton_Checked;
        }

        public static readonly DependencyProperty PlaceholderTextProperty =
            DependencyProperty.Register("PlaceholderText", typeof(string), typeof(CustomRadioButton), new PropertyMetadata(""));

        public string PlaceholderText
        {
            get { return (string)GetValue(PlaceholderTextProperty); }
            set { SetValue(PlaceholderTextProperty, value); }
        }

        public static readonly DependencyProperty RbOutputProperty =
            DependencyProperty.Register("RbOutput", typeof(object), typeof(CustomRadioButton), new PropertyMetadata(null));

        public object RbOutput
        {
            get { return GetValue(RbOutputProperty); }
            set { SetValue(RbOutputProperty, value); }
        }

        private void RadioButton_Checked(object sender, RoutedEventArgs e)
        {
            var parent = VisualTreeHelper.GetParent((RadioButton)sender);
            while (parent.GetType() != typeof(RadioButtonsControl))
            {
                parent = VisualTreeHelper.GetParent(parent);
            }
            ((RadioButtonsControl)parent).SelectedOutput = RbOutput;
        }
    }
}