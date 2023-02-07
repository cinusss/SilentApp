using SilentApp.API.Enumerators;

namespace SilentApp.API.Extensions
{
    public class NationalityMapper
    {
        public static string MapNationality(Nationality nationality)
        {
            string nationalityChar = "PL";

            switch (nationality)
            {
                case Nationality.Polska:
                    nationalityChar = "PL";
                    break;
                case Nationality.Inna:
                    nationalityChar = "OTH";
                    break;
            }
            return nationalityChar;
        }
    }
}
