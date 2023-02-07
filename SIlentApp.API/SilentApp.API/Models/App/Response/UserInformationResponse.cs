using System;
using System.Collections.Generic;
using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.App.Response
{
    public class UserInformationResponse : DatabaseResult
    {
        [DbIgnore]
        public List<UserInformationData> UserInformationDatas { get; set; }
        

        public class UserInformationData
        {
            public string AccountName { get; set; }
            public string InstagramName { get; set; }
            public string InstagramNameUpgrade { get; set; }
            public string AccountTypeName { get; set; }
            public string ExpireNormal { get; set; }
            public string ExpireUpgrade { get; set; }
            public string ExpirePremium { get; set; }

        }
    }
}
