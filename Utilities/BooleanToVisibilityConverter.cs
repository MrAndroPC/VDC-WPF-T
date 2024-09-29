using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;
using System.Windows;

namespace VDC_WPF_T.Utilities
{
    public class BooleanToVisibilityConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is bool booleanValue)
            {
                bool invert = parameter != null && System.Convert.ToBoolean(parameter);
                if (invert)
                {
                    booleanValue = !booleanValue;
                }

                return booleanValue ? Visibility.Collapsed : Visibility.Visible;
            }

            return Visibility.Visible;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is Visibility visibility)
            {
                bool invert = parameter != null && System.Convert.ToBoolean(parameter);
                bool isVisible = visibility == Visibility.Visible;
                return invert ? !isVisible : isVisible;
            }

            return false;
        }
    }
}
