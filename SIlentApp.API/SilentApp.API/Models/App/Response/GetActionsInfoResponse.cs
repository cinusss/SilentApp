using System.Collections.Generic;
using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.App.Response
{
    public class GetActionsInfoResponse : DatabaseResult
    {
        [DbParameter]
        public int NumberOfLikes { get; set; }
        [DbIgnore]
        public List<ActionData> ActionDatas { get; set; }

        public class ActionData
        {
            public string GroupName { get; set; }
            public int ActionsNumber { get; set; }
            public int NumberOfUsers { get; set; }
        }
    }
}
