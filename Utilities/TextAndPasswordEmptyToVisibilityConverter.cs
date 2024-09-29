using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;
using System.Windows;
using System.Diagnostics;

namespace VDC_WPF_T.Utilities
{
    public class TextAndPasswordEmptyToVisibilityConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, CultureInfo culture)
        {
            // If both TextBox and PasswordBox are empty, return Visible, otherwise Collapsed
            bool isTextBoxEmpty = string.IsNullOrEmpty(values[0]?.ToString());
            bool isPasswordBoxEmpty = string.IsNullOrEmpty(values[1]?.ToString());

            Debug.WriteLine(values);
            Debug.WriteLine("deb");



            return (isTextBoxEmpty && isPasswordBoxEmpty) ? Visibility.Visible : Visibility.Collapsed;
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
