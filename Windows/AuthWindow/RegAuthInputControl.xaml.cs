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
    public partial class RegAuthInputControl : UserControl
    {
        public RegAuthInputControl()
        {
            InitializeComponent();
            passwordBox.PasswordChanged += PasswordBox_PasswordChanged;
        }

        public static readonly DependencyProperty PasswordProperty =
    DependencyProperty.Register("Password", typeof(string), typeof(RegAuthInputControl), new PropertyMetadata(string.Empty));

        public string Password
        {
            get { return (string)GetValue(PasswordProperty); }
            set { SetValue(PasswordProperty, value); }
        }

        private void PasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
        {
            Password = passwordBox.Password;
        }


        // Dependency Property for Text
        public static readonly DependencyProperty PlaceholderProperty =
            DependencyProperty.Register("Placeholder", typeof(string), typeof(RegAuthInputControl), new PropertyMetadata(string.Empty));

        public string Placeholder
        {
            get { return (string)GetValue(PlaceholderProperty); }
            set { SetValue(PlaceholderProperty, value); }
        }

        // Dependency Property for IsPassword with default value false
        public static readonly DependencyProperty IsPasswordProperty =
            DependencyProperty.Register("IsPassword", typeof(bool), typeof(RegAuthInputControl), new PropertyMetadata(false));

        public bool IsPassword
        {
            get { return (bool)GetValue(IsPasswordProperty); }
            set { SetValue(IsPasswordProperty, value); }
        }

        public string GetValue()
        {
            return !string.IsNullOrEmpty(inputTextBox.Text.ToString()) ? inputTextBox.Text : Password;
        }
    }
}