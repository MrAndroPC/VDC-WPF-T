using System;
using System.Globalization;
using System.Windows.Data;
using VDC_WPF_T.Model;

namespace VDC_WPF_T.Utilities
{
    public class OwnerToDisplayNameConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is PetOwner owner)
            {
                return $"Владелец: {owner.Surname} {owner.Name[0]}.{owner.Patronymic[0]}.";
            }
            return "Владелец:";
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
