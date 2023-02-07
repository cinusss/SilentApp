using SilentApp.API.Enumerators;

namespace SilentApp.API.Extensions
{
    public class GenderMapper
    {
        public static char MapGender(Gender gender)
        {
            char genderChar = 'F';

            switch (gender)
            {
                case Gender.Kobieta:
                    genderChar = 'F';
                    break;
                case Gender.Mężczyzna:
                    genderChar = 'M';
                    break;
                case Gender.Inna:
                    genderChar = 'O';
                    break;
            }
            return genderChar;
        }
    }
}
