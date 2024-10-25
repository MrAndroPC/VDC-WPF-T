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

namespace VDC_WPF_T.Windows.PetWindow
{
    /// <summary>
    /// Логика взаимодействия для CollapsibleContainer.xaml
    /// </summary>
    public partial class CollapsibleContainer : UserControl
    {
        private bool _isCollapsed = false;

        public CollapsibleContainer()
        {
            InitializeComponent();
        }

        // Dependency Property for Header Text
        public static readonly DependencyProperty HeaderTextProperty =
            DependencyProperty.Register("HeaderText", typeof(string), typeof(CollapsibleContainer), new PropertyMetadata("Default Header"));

        public static readonly DependencyProperty CollapsibleContentProperty =
            DependencyProperty.Register("CollapsibleContent", typeof(object), typeof(CollapsibleContainer), new PropertyMetadata(null));

        public string HeaderText
        {
            get => (string)GetValue(HeaderTextProperty);
            set => SetValue(HeaderTextProperty, value);
        }

        public object CollapsibleContent
        {
            get => GetValue(CollapsibleContentProperty);
            set => SetValue(CollapsibleContentProperty, value);
        }

        private void ToggleCollapseButton_Click(object sender, RoutedEventArgs e)
        {
            if (_isCollapsed)
            {
                // Expand
                ContentRow.Height = new GridLength(1, GridUnitType.Star);
                ToggleCollapseButton.Content = "Collapse";
            }
            else
            {
                // Collapse
                ContentRow.Height = new GridLength(0);
                ToggleCollapseButton.Content = "Expand";
            }
            _isCollapsed = !_isCollapsed;
        }

    }
}
